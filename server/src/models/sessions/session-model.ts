export class SessionModel {

  // Consts
  clName = 'SessionModel'

  // Code
  async create(prisma: any) {

    // Debug
    const fnName = `${this.clName}.create()`

    // Create record
    try {
      return await prisma.session.create({
        data: {
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

    // Query record
    var session: any = undefined

    try {
      session = await prisma.session.findUnique({
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

    // Return OK
    return session
  }
}
