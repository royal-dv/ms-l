import { BigNumber, utils } from 'ethers'

import { fromWei } from '@/utils/decimals'

import { numbers } from '@/constants/numbers'

export function randomAddress() {
  return `0x${getRanHex(40)}`
}

function getRanHex(size) {
  const result = []
  const hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)])
  }
  return result.join('')
}

export function generateAddresses(amount: number, decimals: number) {
  const balance = utils.parseUnits(fromWei(1, decimals), decimals)

  return Array.from({ length: amount }, () => ({ recipient: randomAddress(), balance }))
}
