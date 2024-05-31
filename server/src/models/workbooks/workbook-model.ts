export class WorkbookModel {

  // Consts
  clName = 'WorkbookModel'

  // Code
  async create(prisma: any,
               name: string,
               status: string,
               createdById: string) {

    // Debug
    const fnName = `${this.clName}.create()`

    // Create record
    try {
      return await prisma.workbook.create({
        data: {
          name: name,
          status: status,
          createdById: createdById
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
    var workbook: any = undefined

    try {
      workbook = await prisma.workbook.findUnique({
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
    return workbook
  }

  async update(prisma: any,
               id: string,
               name: string,
               status: string,
               createdById: string) {

    // Debug
    const fnName = `${this.clName}.update()`

    // Update record
    try {
      return await prisma.workbook.update({
        data: {
          name: name,
          status: status,
          createdById: createdById
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
               id: string,
               name: string,
               status: string,
               createdById: string) {

    // Debug
    const fnName = `${this.clName}.upsert()`

    // If the id is specified, try to get it
    if (id != null) {

      const workbook = await
              this.getById(
                prisma,
                id)

      if (workbook != null) {
        id = workbook.id
      }
    }

    // Upsert
    if (id == null) {

      return await this.create(
                     prisma,
                     name,
                     status,
                     createdById)
    } else {

      return await this.update(
                     prisma,
                     id,
                     name,
                     status,
                     createdById)
    }
  }
}
