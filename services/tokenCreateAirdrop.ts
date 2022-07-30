import { MerkleTree } from 'merkletreejs'
import { utils, BigNumberish } from 'ethers'

import { Contributors, AirdropParams } from '@/types'

const dataToBytes = (recipient: string, amountWei: BigNumberish) => {
  const pack = utils.defaultAbiCoder.encode(['address', 'uint256'], [recipient, amountWei])

  return pack
}

const hashFunction = (value: string) => {
  const keccak256String = utils.keccak256(value)
  const result = Buffer.from(keccak256String.slice(2), 'hex')
  return result
}

export const createMerkleTree = (recipients: Contributors) => {
  const leaves = recipients.map(({ recipient, balance }) => dataToBytes(recipient, balance))

  // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/test/utils/cryptography/MerkleProof.test.js
  const merkleTree = new MerkleTree(leaves, hashFunction, { hashLeaves: true, sortPairs: true })

  return merkleTree
}

export const makeCreateAirdropRequest = async ({
  airdropName,
  merkleRootHex,
  tokenAddress,
  total,
  fee,
  massdropContract,
}: AirdropParams) => {
  const args = [airdropName, merkleRootHex, tokenAddress, total]

  const estimateGas = await massdropContract.estimateGas.createAirdrop(...args, { value: fee })
  console.log('estimateGas', estimateGas)

  const tx = await massdropContract.createAirdrop(...args, { value: fee, gasLimit: estimateGas.mul(120).div(100) })

  return tx.wait()
}
