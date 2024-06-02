import { prisma } from '@/db'
import { SessionModel } from '@/models/sessions/session-model'

export default async function handler(req: any, res: any) {

  // Debug
  const fnName = `pages/api/tools/workbooks/new: handler()`

  console.log(`${fnName}: ${JSON.stringify(req.body)}`)

  // Method validation
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: false,
      msg: 'Method not allowed'
    })
  }

  // Call service
  const sessionModel = new SessionModel()

  var session: any = undefined

  try {
    session = await
      sessionModel.create(
        prisma)
  } catch(error) {
    console.error(`${fnName}: error: ${JSON.stringify(error)}`)
  }

  // Respond
  res.status(200).json({
    status: true,
    msg: 'OK',
    session: session
  })
}
