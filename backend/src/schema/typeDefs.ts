export const typeDefs = `

  type AuthResponse {
    token: String!
    expiresIn: Int!
  }

  type Account {
    id: ID!
    accountNumber: String!
    user: User
  }

  type User {
    id: ID!
    firstName: String!
    taxId: String!
    account: Account
  }


  type Transaction {
    id: ID!
    sender: Account!
    receiver: Account!
    value: Int!
    createdAt: String!
  }


  type AccountDetails {
    balance: Int!
    accountNumber: String!
    user: User!
  }

  type Query {
    user(id: ID!): User
    accountDetails: AccountDetails
    getUserTransactions: [Transaction]
  }

  type Mutation {
    register(firstName: String!, taxId: String!, password: String!, confirmPassword: String!): AuthResponse!
    login(taxId: String!, password: String!): AuthResponse!
    sendTransaction(senderAccountNumber: String!, receiverTaxId: String!, value: Int!, idempotencyKey: String!): Transaction
  }
`
