import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import dayjs from 'dayjs'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidCnpj(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, '')

  if (cnpj.length !== 14) return false

  // Elimina CNPJs inválidos conhecidos
  if (/^(\d)\1+$/.test(cnpj)) return false

  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho)
  const digitos = cnpj.substring(tamanho)
  let soma = 0
  let pos = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--
    if (pos < 2) pos = 9
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado !== parseInt(digitos.charAt(0))) return false

  tamanho = tamanho + 1
  numeros = cnpj.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--
    if (pos < 2) pos = 9
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
  if (resultado !== parseInt(digitos.charAt(1))) return false

  return true
}

export function isValidCpf(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '')

  if (cpf.length !== 11) return false

  // Elimina CPFs inválidos conhecidos
  if (/^(\d)\1+$/.test(cpf)) return false

  let soma = 0
  let resto
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  resto = (soma * 10) % 11

  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.substring(9, 10))) return false

  soma = 0
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  resto = (soma * 10) % 11

  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.substring(10, 11))) return false

  return true
}

export function isValidDocument(document: string) {
  document = document.replace(/\D/g, '')
  return isValidCnpj(document) || isValidCpf(document)
}
export function welcomeUser() {
  const horaAtual = dayjs().hour()

  if (horaAtual >= 6 && horaAtual < 12) {
    return 'Good morning'
  } else if (horaAtual >= 12 && horaAtual < 18) {
    return 'Good afternoon'
  } else {
    return 'Good night'
  }
}

export const delay = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export const formatDollarMoney = (cents: number): string => {
  if (typeof cents !== 'number' || isNaN(cents)) {
    return '0'
  }

  const dollars = cents / 100

  return dollars.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export const convertMoneyToCents = (dollars: number | string): number => {
  dollars = parseFloat(
    String(dollars)
      .replace(/[^\d,.-]/g, '')
      .replace(',', '.'),
  )

  if (isNaN(Number(dollars))) {
    throw new Error('O valor fornecido deve ser um número.')
  }

  return Math.round(Number(dollars) * 100)
}

export const extractGraphQLErrors = (errorObj: Record<string, any>) => {
  const error = JSON.parse(JSON.stringify(errorObj))

  return error?.source?.errors?.[0]?.message ?? error?.errors?.[0]?.message ?? errorObj?.message
}
