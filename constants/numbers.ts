import { BigNumber } from 'ethers'

const BG_ZERO = BigNumber.from(0)
const MAX_APPROVE_AMOUNT = BigNumber.from(2).pow(256).sub(1)


export const numbers = {
  ZERO:0,
  ONE:1,
  TWO:2,
  TEN:10,
  PRECISION:4,
  ARR_START_INDEX:0,
  ETH_DECIMALS: 18,

  BG_ZERO,
  MAX_APPROVE_AMOUNT,
}
