export class UserProfileModel {

  // Consts
  clName = 'UserProfileModel'

  // Code
  async create(prisma: any,
               userId: string | undefined,
               isAdmin: boolean) {

    // Debug
    const fnName = `${this.clName}.create()`

    // Create record
    try {
      return await prisma.userProfile.create({
        data: {
          userId: userId,
          isAdmin: isAdmin
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
  
    // Get record
    try {
      return await prisma.userProfile.findUnique({
        where: {
          id: id
        }
      })
    } catch(error) {
      if (!(error instanceof error.NotFound)) {
        console.error(`${fnName}: error: ${error}`)
        throw 'Prisma error'
      }
    }
  }

  async getByUserId(
          prisma: any,
          userId: string) {

    // Debug
    const fnName = `${this.clName}.getByUserId()`
  
    // Get record
    try {
      return await prisma.userProfile.findFirst({
        where: {
          userId: userId
        }
      })
    } catch(error) {
      if (!(error instanceof error.NotFound)) {
        console.error(`${fnName}: error: ${error}`)
        throw 'Prisma error'
      }
    }
  }
}
