import { prisma } from '@/db'
import { TaskNoteModel } from '@/models/tasks/task-note-model'

export default async function handler(req: any, res: any) {

  // Debug
  const fnName = `pages/api/tools/task-notes/set: handler()`

  console.log(`${fnName}: ${JSON.stringify(req.body)}`)

  // Method validation
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: false,
      msg: 'Method not allowed'
    })
  }

  // Vars
  const { id, taskId, note } = req.body

  // Validation
  if (!taskId) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter taskId not specified'
    })
  }

  if (!note) {
    return res.status(400).json({
      status: false,
      msg: 'Parameter note not specified'
    })
  }

  // Save the note
  const taskNoteModel = new TaskNoteModel()

  var results: any = undefined

  try {
    results = await
      taskNoteModel.upsert(
        prisma,
        id,
        taskId,
        note)
  } catch(error) {
    console.error(`${fnName}: error: ${JSON.stringify(error)}`)
  }

  // Validate
  if (results.status === false ||
      results.taskNote == null) {

    return res.status(400).json({
      status: false,
      msg: 'Failed to set the note'
    })
  }

  // Respond
  res.status(200).json({
    status: true,
    msg: 'OK',
    taskNote: results.taskNote
  })
}
