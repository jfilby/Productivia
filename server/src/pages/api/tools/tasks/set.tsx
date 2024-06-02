import { prisma } from '@/db'
import { SessionModel } from '@/models/sessions/session-model'
import { TaskService } from '@/services/tasks/task-service'

export default async function handler(req: any, res: any) {

  // Debug
  const fnName = `pages/api/tools/tasks/set: handler()`

  console.log(`${fnName}: ${JSON.stringify(req.body)}`)

  // Method validation
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: false,
      msg: 'Method not allowed'
    })
  }

  // Vars
  var { createdSessionId } = req.body
  const { parentId, name, description } = req.body

  // Validation
  if (!name) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter name not specified'
    })
  }

  // Create a new workbook if no workbookId was specified
  const sessionModel = new SessionModel()

  try {
    const session = await
            sessionModel.create(
              prisma)

    createdSessionId = session.id
  } catch(error) {
    console.error(`${fnName}: error: ${JSON.stringify(error)}`)
  }

  // Call service
  const taskService = new TaskService()

  var results: any = undefined

  try {
    results = await
      taskService.set(
        prisma,
        parentId,
        name,
        description,
        createdSessionId)
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
