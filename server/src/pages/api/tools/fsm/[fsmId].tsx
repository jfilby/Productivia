import { prisma } from '@/db'
import { FsmService } from '@/services/fsm/fsm-service'

export default async function handler(req: any, res: any) {

  // Debug
  const fnName = `pages/api/tools/fsm/[fsmId]: handler()`

  console.log(`${fnName}: JSON.stringify(req.body))`)

  // Vars
  const { fsmId } = req.query

  // Validation
  if (!fsmId) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter fsmId not specified'
    })
  }

  // Call service
  const fsmService = new FsmService()

  var results: any = undefined

  try {
    results = await
      fsmService.getById(
        prisma,
        fsmId)
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
