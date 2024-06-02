import { prisma } from '@/db'
import { FsmTransitionService } from '@/services/fsm/fsm-transition-service'

export default async function handler(req: any, res: any) {

  // Debug
  const fnName = `pages/api/tools/fsm-transitions/set: handler()`

  console.log(`${fnName}: ${JSON.stringify(req.body)}`)

  // Method validation
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: false,
      msg: 'Method not allowed'
    })
  }

  // Vars
  const { fsmId, fromFsmStateId, toFsmStateId, name, description } = req.body

  // Validation
  if (!fsmId) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter fsmId not specified'
    })
  }

  if (!fromFsmStateId) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter fromFsmStateId not specified'
    })
  }

  if (!toFsmStateId) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter toFsmStateId not specified'
    })
  }

  if (!name) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter name not specified'
    })
  }

  // Call service
  const fsmTransitionService = new FsmTransitionService()

  var results: any = undefined

  try {
    results = await
      fsmTransitionService.set(
        prisma,
        fsmId,
        fromFsmStateId,
        toFsmStateId,
        name,
        description)
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
