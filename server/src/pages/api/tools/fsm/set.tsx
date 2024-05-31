import { prisma } from '@/db'
import { FsmService } from '@/services/fsm/fsm-service'

export default async function handler(req: any, res: any) {

  // Debug
  const fnName = `pages/api/tools/fsm/set: handler()`

  console.log(`${fnName}: JSON.stringify(req.body))`)

  // Method validation
  if (req.method !== 'PUT') {
    return res.status(405).json({
      status: false,
      msg: 'Method not allowed'
    })
  }

  // Vars
  const { workbookId, name, description } = req.body

  // Validation
  if (!workbookId) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter workbookId not specified'
    })
  }

  if (!name) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter name not specified'
    })
  }

  // Call service
  const fsmService = new FsmService()

  var results: any = undefined

  try {
    results = await
      fsmService.set(
        prisma,
        workbookId,
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
