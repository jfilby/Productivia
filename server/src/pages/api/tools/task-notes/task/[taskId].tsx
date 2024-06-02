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

  var results: any = undefined

  try {
    results = await
      taskNoteModel.getByTaskId(
        prisma,
        taskId)
  } catch(error) {
    console.error(`${fnName}: error: ${JSON.stringify(error)}`)
  }


  // Validate
  if (results.status === false) {
    return res.status(400).json({
      status: false,
      msg: 'Failed to set the note'
    })
  }

  if (results.taskNote === null) {
    return res.status(200).json({
      status: false,
      msg: 'No note found.'
    })
  }

  // Respond
  res.status(200).json({
    status: true,
    msg: 'OK',
    taskNote: results.taskNote
  })
}
