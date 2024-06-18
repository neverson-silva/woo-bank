import { AppException } from '@/infra/exceptions/app.exception'

export const validatePayload = async <T = any>(payload: any, schema: any): Promise<T> => {
  const result = await schema.safeParseAsync(payload)

  if (result.success) {
    return result.data
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  throw new AppException(result?.error?.issues?.map((issue) => issue?.message).join('. '))
}
