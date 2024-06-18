import { GraphQLError } from 'graphql'

export class AppException extends GraphQLError {
  constructor(message: string | object) {
    super(typeof message === 'string' ? message : JSON.stringify(message))
  }
}
