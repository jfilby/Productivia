import { FsmTransitionModel } from '@/models/fsm/fsm-transition-model'

export class FsmTransitionService {

  // Consts
  clName = 'FsmTransitionService'

  // Models
  fsmTransitionModel = new FsmTransitionModel()

  // Code
  async getById(
          prisma: any,
          fsmTransitionId: string) {

    // Debug
    const fnName = `${this.clName}.getById()`

    // Get transition
    const fsmTransition = await
            this.fsmTransitionModel.getById(
              prisma,
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

  async getByWorkbookIdAndName(
          prisma: any,
          fsmId: string,
          name: string) {

    // Debug
    const fnName = `${this.clName}.getByWorkbookIdAndName()`

    // Get transition
    const fsmTransition = await
            this.fsmTransitionModel.getByUniqueKey(
              prisma,
              fsmId,
              name)

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
