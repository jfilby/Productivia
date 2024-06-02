import { prisma } from '@/db'
import { TaskService } from '@/services/tasks/task-service'

export default async function handler(req: any, res: any) {

  // Debug
  const fnName = `pages/api/tools/tasks/session/[sessionId]/byTaskId/[taskId]: handler()`

  console.log(`${fnName}: ${JSON.stringify(req.body)}`)

  // Vars
  const { createdSessionId, taskId } = req.query

  // Validation
  if (!taskId) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter taskId not specified'
    })
  }

  if (!createdSessionId) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter createdSessionId not specified, likely nothing created yet'
    })
  }

  // Call service
  const taskService = new TaskService()

  var results: any = undefined

  try {
    results = await
      taskService.getByTaskIdAndCreatedSessionId(
        prisma,
        taskId,
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
