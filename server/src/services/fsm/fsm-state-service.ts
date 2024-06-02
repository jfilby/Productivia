import { FsmStateModel } from '@/models/fsm/fsm-state-model'

export class FsmStateService {

  // Consts
  clName = 'FsmStateService'

  // Models
  fsmStateModel = new FsmStateModel()

  // Code
  async getByFsmIdAndFsmStateId(
          prisma: any,
          fsmId: string,
          fsmStateId: string) {

    // Debug
    const fnName = `${this.clName}.getByFsmIdAndFsmStateId()`

    // Get state
    const fsmState = await
            this.fsmStateModel.getByFsmIdAndFsmStateId(
              prisma,
              fsmId,
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
