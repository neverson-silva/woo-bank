import { graphql } from 'react-relay'

export const SendTransactionMutation = graphql`
  mutation sendTransactionMutation(
    $senderAccountNumber: String!
    $receiverTaxId: String!
    $value: Int!
    $idempotencyKey: String!
  ) {
    sendTransaction(
      senderAccountNumber: $senderAccountNumber
      receiverTaxId: $receiverTaxId
      value: $value
      idempotencyKey: $idempotencyKey
    ) {
      id
    }
  }
`
