export const typeDefs = `#graphql

  # Productivia Types
  # ----

  type StatusAndMessage {
    status: Boolean!
    message: String
  }

  type Workbook {
    id: String!
    status: String!
  }

  type WorkbookResults {
    status: Boolean!
    message: String
    workbook: Workbook
  }

  # Serene Core (types)
  # ---

  type ExistsResults {
    status: Boolean!
    message: String
    exists: Boolean
  }

  type StatusAndMessage {
    status: Boolean!
    message: String
  }

  type StatusAndMessageAndId {
    status: Boolean!
    message: String
    id: String
  }

  # type Tip {
  #   id: String!
  #   name: String!
  #   tags: [String]
  # }

  # type TipsResults {
  #   status: Boolean!
  #   message: String
  #   tips: [Tip]
  # }

  type UserPreference {
    category: String!
    key: String!
    value: String
    values: [String]
  }

  type UserProfile {
    id: String!
    userId: String
    isAdmin: Boolean!
  }

  # Queries
  # ---

  type Query {

    # Serene Core
    # ---

    # Profile
    validateProfileCompleted(
      forAction: String!,
      userProfileId: String!): StatusAndMessage!

    # Tips
    # getTipsByUserProfileIdAndTags(
    #   userProfileId: String!,
    #   tags: [String]): TipsResults!

    # tipGotItExists(
    #   name: String!,
    #   userProfileId: String!): ExistsResults!

    # Users
    isAdminUser(userProfileId: String!): StatusAndMessage!
    userById(userProfileId: String!): UserProfile
    verifySignedInUserProfileId(userProfileId: String!): Boolean

    # User preferences
    getUserPreferences(
      userProfileId: String!,
      category: String!,
      keys: [String]): [UserPreference]

    # Productivia
    # ---
  }

  type Mutation {

    # Serene Core
    # ---
  
    # Users
    createBlankUser: UserProfile!
    createUserByEmail(email: String!): UserProfile!
    deactivateUserProfileCurrentIFile(id: String!): Boolean
    getOrCreateSignedOutUser(
      signedOutId: String,
      defaultUserPreferences: String): UserProfile!
    getOrCreateUserByEmail(
      email: String!,
      defaultUserPreferences: String): UserProfile!
  
    # Tips
    # deleteTipGotIt(
    #   name: String,
    #   userProfileId: String!): StatusAndMessage!

    # upsertTipGotIt(
    #   name: String!,
    #   userProfileId: String!): StatusAndMessage!

    # User preferences
    upsertUserPreference(
      userProfileId: String!,
      category: String!,
      key: String!,
      value: String,
      values: [String]): Boolean

    # Productivia
    # ---

    # Admin
    runSetup(userProfileId: String!): StatusAndMessage!

    # Workbooks
    clearWorkbook(
      workbookId: String!,
      userProfileId: String!): StatusAndMessage!

    createWorkbook(
      name: String,
      userProfileId: String!): WorkbookResults!
  }
`

export { typeDefs as default }
