import { graphql } from 'react-relay'

export const AccountDetailsQuery = graphql`
  query accountDetailsQuery {
    accountDetails {
      balance
      accountNumber
      user {
        id
      }
    }
  }
`
