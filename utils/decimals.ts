import { numbers } from '@/constants/numbers'
import { BigNumberish, BigNumber, utils } from 'ethers'

export function fromWei(balance: BigNumberish, unitName: string | BigNumberish = numbers.ETH_DECIMALS) {
  const isStringName = isNaN(Number(unitName))
  return utils.formatUnits(balance, (isStringName ? unitName : Number(unitName)))
}

export function intParser(value: number | string, multiplier: number): string {
  return String(parseInt(String(Number(value) * multiplier)))
}

export function getDecimals(num: number, limit = numbers.PRECISION) {
  if (Number.isInteger(num)) {
    return numbers.ZERO
  }

  const decimalStr = num.toString().split('.')[numbers.ONE]
  let result = decimalStr.substring(numbers.ZERO, limit)

  if (result.length > numbers.ONE && Number(result) === numbers.ZERO) {
    const MIN_PRECISION = numbers.ONE / Math.pow(numbers.TEN, limit)

    return Number(String(MIN_PRECISION).substring(numbers.ARR_START_INDEX, numbers.TWO))
  }

  while (result.endsWith('0')) {
    result = result.substring(numbers.ZERO, result.length - numbers.ONE)
  }

  return result
}

export function toDecimalsPlaces(value: number | string, decimals = numbers.PRECISION): string {
  if (Number(value) === numbers.ZERO) {
    return String(numbers.ZERO)
  }

  const MIN_PRECISION = numbers.ONE / Math.pow(numbers.TEN, decimals)

  if (Number(value) < MIN_PRECISION && Number(value) > numbers.ZERO) {
    return `~${MIN_PRECISION}`
  }

  const decimalsValue = getDecimals(Number(value), decimals)

  if (decimalsValue > numbers.ZERO) {
    return `${intParser(Number(value), numbers.ONE)}.${decimalsValue}`
  }
  if (decimalsValue === numbers.ZERO && String(value).includes('.')) {
    return intParser(Number(value), numbers.ONE)
  }
  return String(value)
}

export function fromWeiToDecimals(value: BigNumberish, decimals = numbers.ETH_DECIMALS): string {
  let strValue: BigNumberish = value.toString()
  strValue = strValue.includes('e') ? Number(strValue).toLocaleString('fullwide', { useGrouping: false }) : strValue
  return fromWei(strValue, decimals)
}

