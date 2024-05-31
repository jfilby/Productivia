import { FsmStateModel } from '@/models/fsm/fsm-state-model'

export class FsmStateService {

  // Consts
  clName = 'FsmStateService'

  // Models
  fsmStateModel = new FsmStateModel()

  // Code
  async getById(
          prisma: any,
          fsmStateId: string) {

    // Debug
    const fnName = `${this.clName}.getById()`

    // Get state
    const fsmState = await
            this.fsmStateModel.getById(
              prisma,
              fsmStateId)

    if (fsmState == null) {
      return {
        status: true,
        found: false
      }
    }

    // Return
    return {
      status: true,
      found: false,
      fsmState: fsmState
    }
  }

  async getByWorkbookIdAndName(
          prisma: any,
          fsmId: string,
          name: string) {

    // Debug
    const fnName = `${this.clName}.getByWorkbookIdAndName()`

    // Get state
    const fsmState = await
            this.fsmStateModel.getByUniqueKey(
              prisma,
              fsmId,
              name)

    if (fsmState == null) {
      return {
        status: true,
        found: false
      }
    }

    // Return
    return {
      status: true,
      found: false,
      fsmState: fsmState
    }
  }

  async set(
          prisma: any,
          fsmId: string,
          name: string,
          description: string) {

    // Debug
    const fnName = `${this.clName}.set()`

    // Set state
    const fsmState = await
            this.fsmStateModel.upsert(
              prisma,
              undefined,  // id
              fsmId,
              name,
              description)

    // Return
    return {
      status: true,
      fsmState: fsmState
    }
  }
}
