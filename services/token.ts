import { Contract } from 'ethers'

import { numbers } from '@/constants/numbers'

async function setMaxApprove(contract: Contract, owner: string, sender: string) {
  const maxApprove = numbers.MAX_APPROVE_AMOUNT._hex
  const allowance = await contract.callStatic.allowance(owner, sender)

  console.log('allowance', allowance, contract)
  if (allowance.gte(maxApprove)) {
    console.warn('Already has max approve')
    return
  }

  if (!allowance.isZero()) {
    const reset = await contract.functions.approve(sender, '0x0')
    await reset.wait()
  }

  const approve = await contract.functions.approve(sender, maxApprove)
  await approve.wait()
}

export { setMaxApprove }
