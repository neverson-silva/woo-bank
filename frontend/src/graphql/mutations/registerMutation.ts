import { graphql } from 'react-relay'

export const RegisterMutation = graphql`
  mutation registerMutation(
    $firstName: String!
    $taxId: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      firstName: $firstName
      taxId: $taxId
      password: $password
      confirmPassword: $confirmPassword
    ) {
      token
      expiresIn
    }
  }
`
