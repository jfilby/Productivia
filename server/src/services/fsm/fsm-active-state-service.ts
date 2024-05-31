import { FsmActiveStateModel } from '@/models/fsm/fsm-active-state-model'

export class FsmActiveStateService {

  // Consts
  clName = 'FsmActiveStateService'

  // Models
  fsmActiveStateModel = new FsmActiveStateModel()

  // Code
  async getById(
          prisma: any,
          fsmStateId: string) {

    // Debug
    const fnName = `${this.clName}.getById()`

    // Get active state
    const fsmActiveState = await
            this.fsmActiveStateModel.getById(
              prisma,
              fsmStateId)

    if (fsmActiveState == null) {
      return {
        status: true,
        found: false
      }
    }

    // Return
    return {
      status: true,
      found: false,
      fsmActiveState: fsmActiveState
    }
  }

  async getByWorkbookIdAndName(
          prisma: any,
          fsmId: string,
          name: string) {

    // Debug
    const fnName = `${this.clName}.getByWorkbookIdAndName()`

    // Get active state
    const fsmActiveState = await
            this.fsmActiveStateModel.getByUniqueKey(
              prisma,
              fsmId,
              name)

    if (fsmActiveState == null) {
      return {
        status: true,
        found: false
      }
    }

    // Return
    return {
      status: true,
      found: false,
      fsmActiveState: fsmActiveState
    }
  }

  async set(
          prisma: any,
          fsmId: string,
          name: string,
          description: string) {

    // Debug
    const fnName = `${this.clName}.set()`

    // Set active state
    const fsmActiveState = await
            this.fsmActiveStateModel.upsert(
              prisma,
              undefined,  // id
              fsmId,
              name,
              description)

    // Return
    return {
      status: true,
      fsmActiveState: fsmActiveState
    }
  }
}
