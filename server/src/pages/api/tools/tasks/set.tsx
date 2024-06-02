import { prisma } from '@/db'
import { SessionModel } from '@/models/sessions/session-model'
import { TaskModel } from '@/models/tasks/task-model'
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
  const { id, parentId, name, assignedTo, when, description } = req.body

  // Validation
  if (id == null) {

    // Validate fields required if creating
    if (name == null) {

      return res.status(400).json({
        status: false,
        msg: 'Parameter name not specified (when id not specified)'
      })
    }
  }

  if (createdSessionId == null) {

    // If a parentId is specified, then get the createdSessionId from that
    // task. This is a workaround for the Vertex AI Agent, currently using
    // Gemini 1.0, which doesn't always use createdSessionId as an in
    // parameter.
    const taskModel = new TaskModel()

    if (parentId != null) {

      const parentTask = await
              taskModel.getById(
                prisma,
                parentId)

      createdSessionId = parentTask.createdSessionId
    } else {

      // Create a new session if no createdSessionId was specified
      const sessionModel = new SessionModel()

      try {
        const session = await
                sessionModel.create(
                  prisma)

        createdSessionId = session.id
      } catch(error) {
        console.error(`${fnName}: error: ${JSON.stringify(error)}`)
      }
    }
  }

  // Call service
  const taskService = new TaskService()

  var results: any = undefined

  try {
    results = await
      taskService.set(
        prisma,
        id,
        parentId,
        name,
        assignedTo,
        when,
        description,
        createdSessionId)
  } catch(error) {
    console.error(`${fnName}: error: ${JSON.stringify(error)}`)
  }

  // Validate
  if (results.status === false ||
      results.task == null) {

    return res.status(400).json({
      status: false,
      msg: 'Failed to set the task'
    })
  }

  // Respond
  res.status(200).json(results.task)
}
