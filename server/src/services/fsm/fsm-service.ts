import { FsmModel } from '@/models/fsm/fsm-model'

export class FsmService {

  // Consts
  clName = 'FsmService'

  // Models
  fsmModel = new FsmModel()

  // Code
  async getByWorkbookIdAndId(
          prisma: any,
          fsmId: string,
          workbookId: string) {

    // Debug
    const fnName = `${this.clName}.getById()`

    // Get FSM
    const fsm = await
            this.fsmModel.getById(
              prisma,
              fsmId,
              workbookId)

    // Found?
    if (fsm == null) {
      return {
        status: true,
        found: false
      }
    }

    // Return
    return {
      status: true,
      found: true,
      fsm: fsm
    }
  }

  async getByWorkbookIdAndName(
          prisma: any,
          workbookId: string,
          name: string) {

    // Debug
    const fnName = `${this.clName}.getByWorkbookIdAndName()`

    // Get FSM
    const fsm = await
            this.fsmModel.getByUniqueKey(
              prisma,
              workbookId,
              name)

    if (fsm == null) {
      return {
        status: true,
        found: false
      }
    }

    // Return
    return {
      status: true,
      found: false,
      fsm: fsm
    }
  }

  async set(
          prisma: any,
          workbookId: string,
          name: string,
          description: string) {

    // Debug
    const fnName = `${this.clName}.set()`

    // Set FSM
    const fsm = await
            this.fsmModel.upsert(
              prisma,
              undefined,  // id
              workbookId,
              name,
              description)

    // Return
    return {
      status: true,
      fsmId: fsm.id,
      workbookId: fsm.workbookId
    }
  }
}
