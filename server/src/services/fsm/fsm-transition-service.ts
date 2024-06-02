import { FsmTransitionModel } from '@/models/fsm/fsm-transition-model'

export class FsmTransitionService {

  // Consts
  clName = 'FsmTransitionService'

  // Models
  fsmTransitionModel = new FsmTransitionModel()

  // Code
  async getByFsmIdAndFsmTransitionId(
          prisma: any,
          fsmId: string,
          fsmTransitionId: string) {

    // Debug
    const fnName = `${this.clName}.getById()`

    // Get transition
    const fsmTransition = await
            this.fsmTransitionModel.getByFsmIdAndId(
              prisma,
              fsmId,
              fsmTransitionId)

    if (fsmTransition == null) {
      return {
        status: true,
        found: false
      }
    }

    // Return
    return {
      status: true,
      found: false,
      fsmTransition: fsmTransition
    }
  }

  async getFromFsmState(
          prisma: any,
          fsmStateId: string) {

    // Debug
    const fnName = `${this.clName}.getFromFsmState()`

    // Get state
    const fsmTransitions = await
            this.fsmTransitionModel.getFromFsmStateId(
              prisma,
              fsmStateId)

    // Return
    return {
      status: true,
      found: false,
      fsmTransitions: fsmTransitions
    }
  }

  async set(
          prisma: any,
          fsmId: string,
          fromFsmStateId: string,
          toFsmStateId: string,
          name: string,
          description: string) {

    // Debug
    const fnName = `${this.clName}.set()`

    // Set transition
    const fsmTransition = await
            this.fsmTransitionModel.upsert(
              prisma,
              undefined,  // id
              fsmId,
              fromFsmStateId,
              toFsmStateId,
              name,
              description)

    // Return
    return {
      status: true,
      fsmTransition: fsmTransition
    }
  }
}
