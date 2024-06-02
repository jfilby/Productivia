import { prisma } from '@/db'
import { TaskModel } from '@/models/tasks/task-model'

export default async function handler(req: any, res: any) {

  // Debug
  const fnName = `pages/api/tools/tasks/session/[sessionId]/byParentId/[parentId]: handler()`

  console.log(`${fnName}: ${JSON.stringify(req.body)}`)

  // Vars
  const { createdSessionId, parentId } = req.query

  // Validation
  if (!parentId) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter parentId not specified'
    })
  }

  if (!createdSessionId) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter createdSessionId not specified, likely nothing created yet'
    })
  }

  // Call service
  const taskModel = new TaskModel()

  var tasks: any = undefined

  try {
    tasks = await
      taskModel.getByParentIdAndCreatedSessionId(
        prisma,
        parentId,
        createdSessionId)
  } catch(error) {
    console.error(`${fnName}: error: ${JSON.stringify(error)}`)
  }

  // Respond
  res.status(200).json({
    status: true,
    msg: 'OK',
    tasks: tasks
  })
}
