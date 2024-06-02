export class FsmStateModel {

  // Consts
  clName = 'FsmStateModel'

  // Code
  async create(
          prisma: any,
          fsmId: string,
          name: string,
          description: string | undefined) {

    // Debug
    const fnName = `${this.clName}.create()`

    // Create record
    try {
      return await prisma.fsmState.create({
        data: {
          fsmId: fsmId,
          name: name,
          description: description
        }
      })
    } catch(error) {
      console.error(`${fnName}: error: ${error}`)
      throw 'Prisma error'
    }
  }

  async getByFsmIdAndFsmStateId(
          prisma: any,
          fsmId: string,
          id: string) {

    // Debug
    const fnName = `${this.clName}.getById()`

    // Query
    var fsmState: any = null

    try {
      fsmState = await prisma.fsmState.findFirst({
        where: {
          fsmId: fsmId,
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
    return fsmState
  }

  async getByUniqueKey(
          prisma: any,
          fsmId: string,
          name: string) {

    // Debug
    const fnName = `${this.clName}.getByUniqueKey()`

    // Query
    var fsmState: any = null

    try {
      fsmState = await prisma.fsmState.findFirst({
        where: {
          fsmId: fsmId,
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
    return fsmState
  }

  async update(
          prisma: any,
          id: string,
          fsmId: string,
          name: string,
          description: string | undefined) {

    // Debug
    const fnName = `${this.clName}.update()`

    // Create record
    try {
      return await prisma.fsmState.update({
        data: {
          fsmId: fsmId,
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
               fsmId: string,
               name: string,
               description: string | undefined) {

    // Debug
    const fnName = `${this.clName}.upsert()`

    // If id isn't specified, try to get by the unique key
    if (id == null) {

      const fsmState = await
              this.getByUniqueKey(
                prisma,
                fsmId,
                name)

      if (fsmState != null) {
        id = fsmState.id
      }
    }

    // Upsert
    if (id == null) {

      // Create
      return await
               this.create(
                 prisma,
                 fsmId,
                 name,
                 description)
    } else {

      // Update
      return await
               this.update(
                 prisma,
                 id,
                 fsmId,
                 name,
                 description)
    }
  }
}
