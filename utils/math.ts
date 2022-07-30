import { utils, BigNumberish } from 'ethers'

function getRangeRandom(min: number, max: number) {
  return String(Math.random() * (max - min) + min).substring(0, 20)
}

function parseEther(amount: BigNumberish) {
  return utils.parseEther(amount.toString())
}

export { getRangeRandom, parseEther }
