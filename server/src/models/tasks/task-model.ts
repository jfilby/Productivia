export class TaskModel {

  // Consts
  clName = 'TaskModel'

  // Code
  async create(
          prisma: any,
          parentId: string | undefined,
          name: string | undefined,
          assignedTo: string | undefined,
          when: string | undefined,
          description: string | undefined,
          createdSessionId: string) {

    // Debug
    const fnName = `${this.clName}.create()`

    // Create record
    try {
      return await prisma.task.create({
        data: {
          parentId: parentId,
          name: name,
          assignedTo: assignedTo,
          when: when,
          description: description,
          createdSessionId: createdSessionId
        }
      })
    } catch(error) {
      console.error(`${fnName}: error: ${error}`)
      throw 'Prisma error'
    }
  }

  async getById(
          prisma: any,
          id: string) {

    // Debug
    const fnName = `${this.clName}.getById()`

    // Query
    var task: any = null

    try {
      task = await prisma.task.findUnique({
        where: {
          id: id
        }
      })
    } catch(error: any) {
      if (!(error instanceof error.NotFound)) {
        console.error(`${fnName}: error: ${error}`)
        throw 'Prisma error'
      }
    }

    // Return
    return task
  }

  async getByIdAndCreatedSessionId(
          prisma: any,
          id: string,
          createdSessionId: string) {

    // Debug
    const fnName = `${this.clName}.getByIdAndCreatedSessionId()`

    // Query
    var task: any = null

    try {
      task = await prisma.task.findFirst({
        where: {
          id: id,
          createdSessionId: createdSessionId
        }
      })
    } catch(error: any) {
      if (!(error instanceof error.NotFound)) {
        console.error(`${fnName}: error: ${error}`)
        throw 'Prisma error'
      }
    }

    // Return
    return task
  }

  async getByNameAndCreatedSessionId(
          prisma: any,
          name: string,
          createdSessionId: string) {

    // Debug
    const fnName = `${this.clName}.getByNameAndCreatedSessionId()`

    // Query
    var task: any = null

    try {
      task = await prisma.task.findFirst({
        where: {
          name: name,
          createdSessionId: createdSessionId
        }
      })
    } catch(error: any) {
      if (!(error instanceof error.NotFound)) {
        console.error(`${fnName}: error: ${error}`)
        throw 'Prisma error'
      }
    }

    // Return
    return task
  }

  async getByParentIdAndCreatedSessionId(
          prisma: any,
          parentId: string,
          createdSessionId: string) {

    // Debug
    const fnName = `${this.clName}.getByParentIdAndCreatedSessionId()`

    // Query
    try {
      return await prisma.task.findMany({
        where: {
          parentId: parentId,
          createdSessionId: createdSessionId
        }
      })
    } catch(error: any) {
      console.error(`${fnName}: error: ${error}`)
      throw 'Prisma error'
    }
  }

  async update(
          prisma: any,
          id: string,
          parentId: string | undefined,
          name: string | undefined,
          assignedTo: string | undefined,
          when: string | undefined,
          description: string | undefined) {

    // Debug
    const fnName = `${this.clName}.update()`

    // Create record
    try {
      return await prisma.task.update({
        data: {
          parentId: parentId,
          name: name,
          assignedTo: assignedTo,
          when: when,
          description: description
        },
        where: {
          id: id
        }
      })
    } catch(error) {
      console.error(`${fnName}: error: ${error}`)
      throw 'Prisma error'
    }
  }

  async upsert(prisma: any,
               id: string | undefined,
               parentId: string | undefined,
               name: string | undefined,
               assignedTo: string | undefined,
               when: string | undefined,
               description: string | undefined,
               createdSessionId: string) {

    // Debug
    const fnName = `${this.clName}.upsert()`

    // If id isn't specified, try to get by the unique key
    if ((id == null) &&
        (name != null &&
         createdSessionId != null)) {

      const task = await
              this.getByNameAndCreatedSessionId(
                prisma,
                name,
                createdSessionId)

      if (task != null) {
        id = task.id
      }
    }

    // Upsert
    if (id == null) {

      // Create
      return await
               this.create(
                 prisma,
                 parentId,
                 name,
                 assignedTo,
                 when,
                 description,
                 createdSessionId)
    } else {

      // Update
      return await
               this.update(
                 prisma,
                 id,
                 parentId,
                 name,
                 assignedTo,
                 when,
                 description)
    }
  }
}
