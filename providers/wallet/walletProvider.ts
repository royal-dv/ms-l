import { utils } from 'ethers'
import { hexValue } from '@ethersproject/bytes'

import {
  Params,
  Address,
  RpcProvider,
  Transaction,
  ProviderOptions,
  OldRequestParams,
  ProviderInstance,
  OnListenerParams,
  GetBalanceParams,
  SendRequestParams,
  TransactionResult,
  TransactionByHash,
  BatchRequestParams,
  WaitForTxReceiptParams,
} from './types'
import parseDuration from 'parse-duration'

// TODO create type & constants for RPC methods
export class AbstractProvider implements ProviderInstance {
  protected readonly config: { callRetryAttempt: number }

  public version: string
  public address: string
  public networkId: number
  public provider: RpcProvider

  private static generateId(): number {
    const base = 10
    const exponent = 3

    const date = Date.now() * Math.pow(base, exponent)
    const extra = Math.floor(Math.random() * Math.pow(base, exponent))
    return date + extra
  }

  public constructor(options: ProviderOptions) {
    this.address = ''
    this.version = 'new'
    this.networkId = 1

    this.config = {
      callRetryAttempt: 15,
    }

    this.provider = options.provider
  }

  public async setupProvider(): Promise<Address> {
    if (!this.provider) {
      throw new Error('Please, connect your wallet to the browser')
    }

    await this.checkVersion()

    return await this.initProvider()
  }

  public async sendRequest<T>(params: SendRequestParams): Promise<T> {
    const args = this.prepareRequest(params)

    // TODO rename gasLimit to gas
    if (this.version === 'old') {
      return await this.sendAsync<T>({ ...args, from: this.address })
    }

    return await this.provider.request<T>(args)
  }

  public async getBalance({ address }: GetBalanceParams): Promise<string> {
    const { callRetryAttempt } = this.config

    const params = {
      method: 'eth_getBalance',
      params: [address, 'latest'],
    }

    return await this.repeatRequestUntilResult<string>(params, callRetryAttempt)
  }

  public async waitForTxReceipt({ txHash }: WaitForTxReceiptParams): Promise<Transaction> {
    const { callRetryAttempt } = this.config

    const multiplier = 10

    const receiptParams = {
      method: 'eth_getTransactionReceipt',
      params: [txHash],
    }

    const txParams = {
      method: 'eth_getTransactionByHash',
      params: [txHash],
    }

    const totalAttempt = callRetryAttempt * multiplier
    const [receipt, transaction] = await Promise.all([
      this.repeatRequestUntilResult<TransactionResult>(receiptParams, totalAttempt),
      this.repeatRequestUntilResult<TransactionByHash>(txParams, totalAttempt),
    ])

    return Object.assign(receipt, { value: transaction.value })
  }

  public async batchRequest<T>({ txs, callback }: BatchRequestParams): Promise<T[]> {
    const txsPromisesBucket = []

    const EVERY_SECOND = 2

    for (const [index, params] of txs.entries()) {
      const txPromise = this.sendRequest<T>({
        method: 'eth_sendTransaction',
        params: [params],
      })

      await this.sleep(parseDuration('1 sec'))

      if (index % EVERY_SECOND === 0 && index !== 0) {
        await txPromise
      }

      txsPromisesBucket.push(txPromise)
    }

    if (typeof callback === 'function') {
      callback(txsPromisesBucket)
    }

    return await Promise.all(txsPromisesBucket)
  }

  public async checkNetworkVersion(): Promise<number> {
    const result = await this.sendRequest<string>({ method: 'eth_chainId' })
    return Number(result)
  }

  public on({ method, callback }: OnListenerParams): void {
    if (typeof this.provider.on === 'function') {
      this.provider.on(method, callback)
    }
  }

  public off({ method, callback }: OnListenerParams): void {
    if (typeof this.provider.removeListener === 'function') {
      this.provider.removeListener(method, callback)
    }
  }

  private async initProvider(): Promise<Address> {
    let account: string | null
    if (this.version === 'old') {
      ;[account] = await this.provider.enable()
    } else {
      ;[account] = await this.sendRequest({ method: 'eth_requestAccounts' })
    }

    if (account == null) {
      throw new Error('Locked provider')
    }

    this.address = utils.getAddress(account)

    if (typeof this.provider.on === 'function') {
      this.provider.on('accountsChanged', (accounts: string[]) => this.onAccountsChanged(accounts))
      this.provider.on('chainChanged', (id: number) => this.onNetworkChanged({ id }))
    }

    this.networkId = await this.checkNetworkVersion()

    return this.address
  }

  private async sleep(time: number): Promise<void> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }

  private async sendAsync<T>({ method, params, from }: OldRequestParams): Promise<T> {
    const SPOA = 77
    const POA = 99
    const XDAI = 99

    switch (this.networkId) {
      case SPOA:
      case POA:
      case XDAI:
        from = ''
        break
    }

    return await new Promise((resolve, reject) => {
      const callback = (err: Error, response: { error: Error; result: T }): void => {
        if (err.message !== '' || response.error.message !== '') {
          reject(err)
        }

        resolve(response.result)
      }

      this.provider.sendAsync(
        {
          from,
          method,
          params,
          jsonrpc: '2.0',
          id: AbstractProvider.generateId(),
        },
        callback,
      )
    })
  }

  private onNetworkChanged({ id }: { id: number }): void {
    if (!isNaN(id)) {
      this.networkId = id
    }
  }

  private onAccountsChanged(accounts: string[]): void {
    const [account] = accounts

    if (account !== '') {
      this.address = utils.getAddress(account)
    }
  }

  private checkVersion(): void {
    if (typeof this.provider.request === 'function') {
      this.version = 'new'
    } else {
      this.version = 'old'
    }
  }

  private prepareRequest({ method, params }: SendRequestParams) {
    switch (method) {
      case 'eth_call':
      case 'eth_estimateGas':
      case 'eth_sendTransaction': {
        if (params instanceof Array) {
          const [args] = params
          return { method, params: [this.hexlifyParams(args)] }
        }
        break
      }
    }

    return { method, params }
  }

  private hexlifyParams(params: Params): Params {
    const result: Params = Object.assign({}, params)

    const numericParams: (keyof Params)[] = ['gas', 'type', 'nonce', 'value', 'gasPrice', 'maxFeePerGas', 'maxPriorityFeePerGas']

    numericParams.forEach((key) => {
      const value = params[key]
      if (value) {
        result[key] = hexValue(value)
      }
    })

    return result
  }

  private async repeatRequestUntilResult<T>(
    params: SendRequestParams,
    totalAttempts: number,
    retryAttempt = 1,
  ): Promise<T> {
    return await new Promise((resolve, reject) => {
      const iteration = async (): Promise<void> => {
        try {
          const result = await this.sendRequest<T>(params)

          if (!result) {
            if (retryAttempt <= totalAttempts) {
              retryAttempt++
              setTimeout(() => {
                // eslint-disable-next-line no-void
                void iteration()
              }, parseDuration(`${retryAttempt} sec`))
            } else {
              return reject(new Error('Tx not minted'))
            }
          } else {
            resolve(result)
          }
        } catch (err) {
          reject(err)
        }
      }

      // eslint-disable-next-line no-void
      void iteration()
    })
  }
}

export const abstractProvider = (options: ProviderOptions) => new AbstractProvider(options)
