import { prisma } from '@/db'
import { FsmStateService } from '@/services/fsm/fsm-state-service'

export default async function handler(req: any, res: any) {

  // Debug
  const fnName = `pages/api/tools/fsm-states/fsm/[fsmId]/byFsmStateId/[fsmStateId]: handler()`

  console.log(`${fnName}: ${JSON.stringify(req.body)}`)

  // Vars
  const { fsmId, fsmStateId } = req.query

  // Validation
  if (!fsmId) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter fsmId not specified'
    })
  }

  if (!fsmStateId) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter fsmStateId not specified'
    })
  }

  // Call service
  const fsmStateService = new FsmStateService()

  var results: any = undefined

  try {
    results = await
      fsmStateService.getByFsmIdAndFsmStateId(
        prisma,
        fsmId,
        fsmStateId)
  } catch(error) {
    console.error(`${fnName}: error: ${JSON.stringify(error)}`)
  }

  // Respond
  res.status(200).json({
    status: true,
    msg: 'OK',
    results: results
  })
}
