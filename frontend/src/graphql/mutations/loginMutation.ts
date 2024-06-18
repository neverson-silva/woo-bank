import { graphql } from 'react-relay'

export const LoginMutation = graphql`
  mutation loginMutation($taxId: String!, $password: String!) {
    login(taxId: $taxId, password: $password) {
      token
      expiresIn
    }
  }
`
