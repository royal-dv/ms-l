import { BigNumber } from 'ethers'

import { Contributors, Status, Statuses } from '@/types'

import { numbers } from '@/constants/numbers'

function getBatchSize(batchSize: number, recipientsLength: number, statuses: Statuses = []) {
  const divider = 3
  const maxBatchSize = 1500

  const size = () => {
    if (!batchSize || !statuses.length) {
      return Math.ceil(recipientsLength / divider)
    }

    const [last, prevLast] = statuses
    if ((last?.status && prevLast?.status)) {
      return BigNumber.from(prevLast.txCountPerCall).gte(last.txCountPerCall) ? prevLast.txCountPerCall : last.txCountPerCall
    }

    if ((last?.status && !prevLast?.status)) {
      return getNewBatchSize(last, prevLast, false)
    }

    if ((!last?.status && prevLast?.status)) {
      return getNewBatchSize(prevLast, last, true)
    }

    return Math.ceil(batchSize / divider)
  }

  return Math.min(maxBatchSize, size())
}


function getNewBatchSize(v1: Status, v2: Status, reverse = false) {
  const increasePercent = 60
  const decreasePercent = 140

  const defaultIncrease = 50
  const increaseDivider = 100

  const v1Count = v1?.txCountPerCall || 0
  const v2Count = v2?.txCountPerCall || 0

  let diff = BigNumber.from(v2Count).sub(v1Count)
  if(diff.eq(numbers.BG_ZERO)) {
    const multiplier = reverse ? increasePercent : decreasePercent
    diff = BigNumber.from(v2Count).mul(multiplier).div(increaseDivider).sub(v2Count)
  }
  const additionValue = diff.mul(defaultIncrease).div(increaseDivider)
  return additionValue.add(v1Count).toNumber()
}

function getTotal(list: Contributors, decimals: number) {
  return list.reduce((acc, curr) => acc.add(curr.balance), numbers.BG_ZERO)
}

function getBatchParams(recipients: Contributors, perCall: number, i: number) {
  const from = i * perCall
  const to = Math.min(from + perCall, recipients.length)
  const contributors = recipients.slice(from, to)
  return { from, to, contributors }
}

export { getBatchSize, getNewBatchSize, getTotal, getBatchParams }
