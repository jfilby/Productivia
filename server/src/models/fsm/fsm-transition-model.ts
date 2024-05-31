export class FsmTransitionModel {

  // Consts
  clName = 'FsmTransitionModel'

  // Code
  async create(
          prisma: any,
          fsmId: string,
          fromFsmStateId: string,
          toFsmStateId: string,
          name: string,
          description: string | undefined) {

    // Debug
    const fnName = `${this.clName}.create()`

    // Create record
    try {
      return await prisma.fsmTransition.create({
        data: {
          fsmId: fsmId,
          fromFsmStateId: fromFsmStateId,
          toFsmStateId: toFsmStateId,
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
    var fsmTransition: any = null

    try {
      fsmTransition = await prisma.fsmTransition.findUnique({
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
    return fsmTransition
  }

  async getByUniqueKey(
          prisma: any,
          fsmId: string,
          name: string) {

    // Debug
    const fnName = `${this.clName}.getByUniqueKey()`

    // Query
    var fsmTransition: any = null

    try {
      fsmTransition = await prisma.fsmTransition.findFirst({
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
    return fsmTransition
  }

  async getFromFsmStateId(
          prisma: any,
          fsmStateId: string) {

    // Debug
    const fnName = `${this.clName}.getByUniqueKey()`

    // Query
    try {
      return await prisma.fsmTransition.findMany({
        where: {
          fromFsmStateId: fsmStateId
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
          fsmId: string,
          fromFsmStateId: string,
          toFsmStateId: string,
          name: string,
          description: string | undefined) {

    // Debug
    const fnName = `${this.clName}.update()`

    // Create record
    try {
      return await prisma.fsmTransition.update({
        data: {
          fsmId: fsmId,
          fromFsmStateId: fromFsmStateId,
          toFsmStateId: toFsmStateId,
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
               fromFsmStateId: string,
               toFsmStateId: string,
               name: string,
               description: string | undefined) {

    // Debug
    const fnName = `${this.clName}.upsert()`

    // If id isn't specified, try to get by the unique key
    if (id == null) {

      const fsmTransition = await
              this.getByUniqueKey(
                prisma,
                fsmId,
                name)

      if (fsmTransition != null) {
        id = fsmTransition.id
      }
    }

    // Upsert
    if (id == null) {

      // Create
      return await
               this.create(
                 prisma,
                 fsmId,
                 fromFsmStateId,
                 toFsmStateId,
                 name,
                 description)
    } else {

      // Update
      return await
               this.update(
                 prisma,
                 id,
                 fsmId,
                 fromFsmStateId,
                 toFsmStateId,
                 name,
                 description)
    }
  }
}
