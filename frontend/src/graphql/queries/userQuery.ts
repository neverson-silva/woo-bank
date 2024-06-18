import { graphql } from 'react-relay'

export const UserQuery = graphql`
  query userQuery($id: ID!) {
    user(id: $id) {
      id
      firstName
      taxId
    }
  }
`
