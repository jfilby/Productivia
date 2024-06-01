import { prisma } from '@/db'
import { WorkbookModel } from '@/models/workbooks/workbook-model'
import { FsmService } from '@/services/fsm/fsm-service'

export default async function handler(req: any, res: any) {

  // Debug
  const fnName = `pages/api/tools/fsm/set: handler()`

  console.log(`${fnName}: ${JSON.stringify(req.body)}`)

  // Method validation
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: false,
      msg: 'Method not allowed'
    })
  }

  // Vars
  var { workbookId } = req.body
  const { name, description } = req.body

  // Validation
  if (!name) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter name not specified'
    })
  }

  // Create a new workbook if no workbookId was specified
  const workbookModel = new WorkbookModel()

  try {
    const workbook = await
      workbookModel.create(
        prisma)

    workbookId = workbook.id
  } catch(error) {
    console.error(`${fnName}: error: ${JSON.stringify(error)}`)
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
