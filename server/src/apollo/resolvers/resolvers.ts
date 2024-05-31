// Serene Core imports
import { isAdminUser } from '@/serene-core-server/apollo/resolvers/queries/access'
// import { deleteTipGotIt, upsertTipGotIt } from '@/serene-core-server/apollo/resolvers/mutations/tips'
// import { getTipsByUserProfileIdAndTags, tipGotItExists } from '@/serene-core-server/apollo/resolvers/queries/tips'
import { createBlankUser, createUserByEmail, getOrCreateSignedOutUser, getOrCreateUserByEmail } from '@/serene-core-server/apollo/resolvers/mutations/users'
import { userById, verifySignedInUserProfileId } from '@/serene-core-server/apollo/resolvers/queries/users'
import { getUserPreferences } from '@/serene-core-server/apollo/resolvers/queries/user-preferences'
import { upsertUserPreference } from '@/serene-core-server/apollo/resolvers/mutations/user-preferences'
import { validateProfileCompleted } from '@/serene-core-server/apollo/resolvers/queries/profile'

// Productivia mutations imports
// import { runSetup } from './mutations/admin'
// import { clearWorkbook, createWorkbook } from './mutations/workbooks'

// Productivia queries imports
;

// Code
const Query = {

  // Serene Core
  // ---

  // Profile
  validateProfileCompleted,

  // Tips
  // getTipsByUserProfileIdAndTags,
  // tipGotItExists,

  // Users
  isAdminUser,
  userById,
  verifySignedInUserProfileId,

  // User preferences
  getUserPreferences
}

const Mutation = {

  // Admin
  // runSetup,

  // Workbooks
  // clearWorkbook,
  // createWorkbook,

  // Serene Core
  // ---

  // Tips
  // deleteTipGotIt,
  // upsertTipGotIt,

  // Users
  createBlankUser,
  createUserByEmail,
  getOrCreateSignedOutUser,
  getOrCreateUserByEmail,

  // User preferences
  upsertUserPreference
}

const resolvers = { Query, Mutation }

export default resolvers
