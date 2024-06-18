import { graphql } from 'react-relay'
export const GetUserTransactionsQuery = graphql`
  query getUserTransactionsQuery {
    getUserTransactions {
      id
      sender {
        accountNumber
        user {
          firstName
        }
      }
      receiver {
        accountNumber
        user {
          firstName
        }
      }
      value
      createdAt
    }
  }
`
