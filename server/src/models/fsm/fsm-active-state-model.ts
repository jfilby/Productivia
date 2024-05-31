export class FsmActiveStateModel {

  // Consts
  clName = 'FsmActiveStateModel'

  // Code
  async create(
          prisma: any,
          fsmId: string,
          fsmStateId: string,
          description: string) {

    // Debug
    const fnName = `${this.clName}.create()`

    // Create record
    try {
      return await prisma.fsmActiveState.create({
        data: {
          fsmId: fsmId,
          fsmStateId: fsmStateId,
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
    var fsmActiveState: any = null

    try {
      fsmActiveState = await prisma.fsmActiveState.findUnique({
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
    return fsmActiveState
  }

  async getByUniqueKey(
          prisma: any,
          fsmId: string,
          fsmStateId: string) {

    // Debug
    const fnName = `${this.clName}.getByUniqueKey()`

    // Query
    var fsmActiveState: any = null

    try {
      fsmActiveState = await prisma.fsmActiveState.findFirst({
        where: {
          fsmId: fsmId,
          fsmStateId: fsmStateId
        }
      })
    } catch(error: any) {
      if (!(error instanceof error.NotFound)) {
        console.error(`${fnName}: error: ${error}`)
        throw 'Prisma error'
      }
    }

    // Return
    return fsmActiveState
  }

  async update(
          prisma: any,
          id: string,
          fsmId: string,
          fsmStateId: string,
          description: string) {

    // Debug
    const fnName = `${this.clName}.update()`

    // Create record
    try {
      return await prisma.fsmActiveState.update({
        data: {
          fsmId: fsmId,
          fsmStateId: fsmStateId,
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
               fsmId: string,
               fsmStateId: string,
               description: string) {

    // Debug
    const fnName = `${this.clName}.upsert()`

    // If id isn't specified, try to get by the unique key
    if (id == null) {

      const fsmActiveState = await
              this.getByUniqueKey(
                prisma,
                fsmId,
                fsmStateId)

      if (fsmActiveState != null) {
        id = fsmActiveState.id
      }
    }

    // Upsert
    if (id == null) {

      // Create
      return await
               this.create(
                 prisma,
                 fsmId,
                 fsmStateId,
                 description)
    } else {

      // Update
      return await
               this.update(
                 prisma,
                 id,
                 fsmId,
                 fsmStateId,
                 description)
    }
  }
}
