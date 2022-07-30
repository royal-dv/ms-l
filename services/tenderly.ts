import axios from 'axios'
import { utils } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'


import { apis } from '@/constants/apis'
import { RPC_LIST } from '@/constants/rpc'
import { ChainId } from '@/constants/chains'
import { tenderly } from '@/constants/tenderly'

import { parseEther } from '@/utils/math'
import { getProvider } from '@/services/provider'

const opts = {
  headers: {
    'X-Access-Key': tenderly.TENDERLY_ACCESS_KEY,
  },
}

async function createFork(chainId: ChainId) {
  const provider = getProvider(RPC_LIST[chainId])

  const blockNumber = await provider.getBlockNumber()

  const resp = await axios.post(
    tenderly.TENDERLY_FORK_API,
    {
      network_id: chainId,
      block_number: blockNumber,
    },
    opts,
  )

  const [[address, privateKey]] = Object.entries(resp.data.simulation_fork.accounts)

  return {
    id: resp.data.simulation_fork.id,
    account: { address, privateKey },
  }
}

async function getFork(chainId: ChainId) {
  const { id, account } = await createFork(chainId)

  return {
    rpc: `${apis.TENDERLY_RPC}fork/${id}`,
    id,
    account,
  }
}

async function removeForkRPC(forkId: string) {
  await axios.delete(`${tenderly.TENDERLY_FORK_DELETE}/${forkId}`, opts)
}

async function topUpEther(provider: JsonRpcProvider, address: string, amount = utils.hexValue(parseEther(100))) {
  await provider.send('tenderly_addBalance', [address, amount])
  await provider.send('eth_getBalance', [address, 'latest'])
}

async function simulate(body: Record<string, string | number | boolean>) {
  return axios.post(tenderly.TENDERLY_FORK_SIMULATE, body, opts)
}

export { getFork, removeForkRPC , simulate, topUpEther}
