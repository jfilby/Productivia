import { prisma } from '@/db'
import { FsmStateService } from '@/services/fsm/fsm-state-service'

export default async function handler(req: any, res: any) {

  // Debug
  const fnName = `pages/api/tools/fsm-states/set: handler()`

  console.log(`${fnName}: ${JSON.stringify(req.body)}`)

  // Method validation
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: false,
      msg: 'Method not allowed'
    })
  }

  // Vars
  const { fsmId, name, description } = req.body

  // Validation
  if (!name) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter name not specified'
    })
  }

  // Call service
  const fsmStateService = new FsmStateService()

  var results: any = undefined

  try {
    results = await
      fsmStateService.set(
        prisma,
        fsmId,
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
