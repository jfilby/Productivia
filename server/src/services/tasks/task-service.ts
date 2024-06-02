import { TaskModel } from '@/models/tasks/task-model'

export class TaskService {

  // Consts
  clName = 'TaskService'

  // Models
  taskModel = new TaskModel()

  // Code
  async getByTaskIdAndCreatedSessionId(
          prisma: any,
          taskId: string,
          createdSessionId: string) {

    // Debug
    const fnName = `${this.clName}.getByTaskIdAndCreatedSessionId()`

    // Get state
    const task = await
            this.taskModel.getByIdAndCreatedSessionId(
              prisma,
              taskId,
              createdSessionId)

    if (task == null) {
      return {
        status: true,
        found: false
      }
    }

    // Return
    return {
      status: true,
      found: false,
      task: task
    }
  }

  async set(
          prisma: any,
          id: string | undefined,
          parentId: string,
          name: string,
          description: string,
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
              description,
              createdSessionId)

    // Return
    return {
      status: true,
      task: task
    }
  }
}
