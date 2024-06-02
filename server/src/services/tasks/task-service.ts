import { TaskModel } from '@/models/tasks/task-model'
import { TaskNoteModel } from '@/models/tasks/task-note-model'

export class TaskService {

  // Consts
  clName = 'TaskService'

  // Models
  taskModel = new TaskModel()
  taskNoteModel = new TaskNoteModel()

  // Code
  async getByTaskIdAndCreatedSessionId(
          prisma: any,
          taskId: string,
          createdSessionId: string) {

    // Debug
    const fnName = `${this.clName}.getByTaskIdAndCreatedSessionId()`

    // Get state
    var task = await
          this.taskModel.getByIdAndCreatedSessionId(
            prisma,
            taskId,
            createdSessionId)

    if (task == null) {
      return {
        status: true
      }
    }

    // Get child tasks
    const childTasks = await
            this.taskModel.getByParentIdAndCreatedSessionId(
              prisma,
              taskId,
              createdSessionId)

    task.childTasks = childTasks

    // Get task notes
    const taskNotes = await
            this.taskNoteModel.getByTaskId(
              prisma,
              taskId)

    task.taskNotes = taskNotes

    // Return
    return {
      status: true,
      task: task
    }
  }

  async set(
          prisma: any,
          id: string | undefined,
          parentId: string | undefined,
          name: string | undefined,
          assignedTo: string | undefined,
          when: string | undefined,
          description: string | undefined,
          createdSessionId: string) {

    // Debug
    const fnName = `${this.clName}.set()`

    // Set state
    const task = await
            this.taskModel.upsert(
              prisma,
              id,
              parentId,
              name,
              assignedTo,
              when,
              description,
              createdSessionId)

    // Return
    return {
      status: true,
      task: task
    }
  }
}
