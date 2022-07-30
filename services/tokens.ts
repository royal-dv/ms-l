import { BigNumber, BigNumberish } from 'ethers'

import { CHAINS, NATIVE_CURRENCY_ADDRESS } from '@/constants/chains'
import { fromWeiToDecimals, toDecimalsPlaces } from '@/utils/decimals'

type Formatting = {
  balance: BigNumberish
  address: string
  description: string
  symbol?: string
  decimals?: number
}

type BlockScoutFormatting = Formatting & {
  contractAddress: string
}
async function fetchTokens({ ethAccount, ethBalance, chainId, urlIndex = 0, retryAttempt = 0 }) {
  const rpcCallRetryAttempt = 4

  const { tokenApis, symbol, name } = CHAINS[chainId]

  const nativeCurrDescription = `${name} Native currency`
  const nativeCurrency = assetFormatter({
    symbol,
    balance: ethBalance,
    address: NATIVE_CURRENCY_ADDRESS,
    description: nativeCurrDescription,
  })

  let tokenList = [nativeCurrency]
  try {
    const tokenApi = tokenApis[urlIndex]

    if (tokenApi) {
      const erc20List = await getTokens({ chainId, ethAccount, name: symbol, ...tokenApi })

      tokenList = tokenList.concat(erc20List)
    }

    return tokenList
  } catch (err) {
    retryAttempt++

    if (tokenApis.length > 1) {
      urlIndex++
    }
    // urlIndex = urlIndex % tokenApis.length
    if (retryAttempt === rpcCallRetryAttempt) {
      console.error(err.message)
      return tokenList
    } else {
      return await fetchTokens({ ethAccount, ethBalance, chainId, urlIndex, retryAttempt })
    }
  }
}

export function assetFormatter({ balance, address, description, symbol = '', decimals = 18 }: Formatting) {
  decimals = !BigNumber.from(decimals).isNegative() ? decimals : 18

  const formattedBalance = toDecimalsPlaces(fromWeiToDecimals(balance, Number(decimals))).toString()

  if (formattedBalance) {
    let label = `${formattedBalance} - ${description || address}`

    if (symbol) {
      label = `${symbol} - ${label}`
    }

    return { label, symbol, value: address }
  }
}

async function makeRequest(path) {
  const controller = new AbortController()

  try {
    const response = await Promise.race([
      fetch(path, { signal: controller.signal }),
      new Promise(() => setTimeout(() => controller.abort(), 5000)),
    ])

    // @ts-ignore
    if (response.status !== 200) {
      throw new Error(`Request failed with status: ${status}`)
    }

    // @ts-ignore
    return await response.json()
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getTokensEthplorer(path) {
  try {
    const { tokens } = await makeRequest(path)
    if (!tokens?.length) {
      return []
    }
    return tokens.map(({ tokenInfo, balance }) => assetFormatter({ balance, ...tokenInfo })).filter((el) => el)
  } catch (err) {
    throw new Error(err.message)
  }
}

function onFilterCovalentNativeCurrency(acc, curr, currencyName) {
  const { balance, contract_address: address, contract_decimals: decimals, contract_ticker_symbol: symbol } = curr

  if (symbol !== currencyName) {
    const asset = assetFormatter({ balance, symbol, address, decimals, description: '' })

    return [...acc, asset]
  }
  return acc
}

async function getTokensCovalent(path, currencyName) {
  try {
    const { data } = await makeRequest(path)

    if (!data?.items) {
      return []
    }
    return data.items.reduce((acc, curr) => onFilterCovalentNativeCurrency(acc, curr, currencyName), []).filter((el) => el)
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getTokensBlockScout(path) {
  try {
    const { result } = await makeRequest(path)

    if (!result?.length) {
      return []
    }
    return result
      .map(({ contractAddress, ...result }: BlockScoutFormatting) => assetFormatter({ ...result, address: contractAddress }))
      .filter((el) => el)
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getTokensDefault(path, ethAccount) {
  try {
    const { data } = await makeRequest(path)

    if (!data) {
      return []
    }

    const items = data[ethAccount.toLowerCase()].layer_2.erc_20
    return (
      items
        // eslint-disable-next-line camelcase
        .map(({ token_address, token_symbol, balance, token_decimals }) => {
          return assetFormatter({
            balance,
            description: '',
            symbol: token_symbol,
            address: token_address,
            decimals: token_decimals,
          })
        })
        .filter((el) => el)
    )
  } catch (err) {
    throw new Error(err.message)
  }
}

async function getTokens({ type, url, ethAccount, name, queryParams, chainId }) {
  switch (type) {
    case 'ethplorer':
      return await getTokensEthplorer(`${url}/${ethAccount}?${queryParams}`)
    case 'blockScout':
      return await getTokensBlockScout(`${url}?${queryParams}${ethAccount}`)
    case 'convalenthq':
      return await getTokensCovalent(`${url}/${chainId}/address/${ethAccount}/balances_v2/?${queryParams}`, name)
    default:
      return await getTokensDefault(`${url}/?${queryParams}${ethAccount}`, ethAccount)
  }
}

export { fetchTokens }
