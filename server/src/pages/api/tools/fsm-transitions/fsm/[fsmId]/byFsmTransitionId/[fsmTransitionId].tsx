import { prisma } from '@/db'
import { FsmTransitionService } from '@/services/fsm/fsm-transition-service'

export default async function handler(req: any, res: any) {

  // Debug
  const fnName = `pages/api/tools/fsm-states/fsm/[fsmId]/byFsmStateId/[fsmStateId]: handler()`

  console.log(`${fnName}: ${JSON.stringify(req.body)}`)

  // Vars
  const { fsmId, fsmTransitionId } = req.query

  // Validation
  if (!fsmId) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter fsmId not specified'
    })
  }

  if (!fsmTransitionId) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter fsmTransitionId not specified'
    })
  }

  // Call service
  const fsmTransitionService = new FsmTransitionService()

  var results: any = undefined

  try {
    results = await
      fsmTransitionService.getByFsmIdAndFsmTransitionId(
        prisma,
        fsmId,
        fsmTransitionId)
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
