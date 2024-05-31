export class FsmModel {

  // Consts
  clName = 'FsmModel'

  // Code
  async create(
          prisma: any,
          workbookId: string,
          name: string,
          description: string | undefined) {

    // Debug
    const fnName = `${this.clName}.create()`

    // Create record
    try {
      return await prisma.fsm.create({
        data: {
          workbookId: workbookId,
          name: name,
          description: description
        }
      })
    } catch(error) {
      console.error(`${fnName}: error: ${error}`)
      throw 'Prisma error'
    }
  }

  async getById(prisma: any,
                id: string) {

    // Debug
    const fnName = `${this.clName}.getById()`

    // Query
    var fsm: any = null

    try {
      fsm = await prisma.fsm.findUnique({
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
    return fsm
  }

  async getByUniqueKey(
          prisma: any,
          workbookId: string,
          name: string) {

    // Debug
    const fnName = `${this.clName}.getByUniqueKey()`

    // Query
    var fsm: any = null

    try {
      fsm = await prisma.fsm.findFirst({
        where: {
          workbookId: workbookId,
          name: name
        }
      })
    } catch(error: any) {
      if (!(error instanceof error.NotFound)) {
        console.error(`${fnName}: error: ${error}`)
        throw 'Prisma error'
      }
    }

    // Return
    return fsm
  }

  async update(
          prisma: any,
          id: string,
          workbookId: string,
          name: string,
          description: string | undefined) {

    // Debug
    const fnName = `${this.clName}.update()`

    // Create record
    try {
      return await prisma.fsm.update({
        data: {
          workbookId: workbookId,
          name: name,
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
               workbookId: string,
               name: string,
               description: string | undefined) {

    // Debug
    const fnName = `${this.clName}.upsert()`

    // If id isn't specified, try to get by the unique key
    if (id == null) {

      const fsm = await
              this.getByUniqueKey(
                prisma,
                workbookId,
                name)

      if (fsm != null) {
        id = fsm.id
      }
    }

    // Upsert
    if (id == null) {

      // Create
      return await
               this.create(
                 prisma,
                 workbookId,
                 name,
                 description)
    } else {

      // Update
      return await
               this.update(
                 prisma,
                 id,
                 workbookId,
                 name,
                 description)
    }
  }
}
