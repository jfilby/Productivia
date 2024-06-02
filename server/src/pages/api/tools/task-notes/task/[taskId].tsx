import { prisma } from '@/db'
import { TaskNoteModel } from '@/models/tasks/task-note-model'

export default async function handler(req: any, res: any) {

  // Debug
  const fnName = `pages/api/tools/task-notes/task/[taskId]: handler()`

  console.log(`${fnName}: ${JSON.stringify(req.body)}`)

  // Vars
  const { taskId } = req.query

  // Validation
  if (!taskId) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter taskId not specified'
    })
  }

  // Call service
  const taskNoteModel = new TaskNoteModel()

  var taskNotes: any = undefined

  try {
    taskNotes = await
      taskNoteModel.getByTaskId(
        prisma,
        taskId)
  } catch(error) {
    console.error(`${fnName}: error: ${JSON.stringify(error)}`)
  }


  // Validate
  if (taskNotes == null) {
    return res.status(400).json({
      status: false,
      msg: 'Failed to find notes.'
    })
  }

  // Respond
  res.status(200).json(taskNotes)
}
