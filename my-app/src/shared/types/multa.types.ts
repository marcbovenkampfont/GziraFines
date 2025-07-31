export const MultaStatus = {
  PAID: 'paid',
  NOT_PAID: 'not paid',
  REJECTED: 'rejected',
} as const

export type MultaStatus = typeof MultaStatus[keyof typeof MultaStatus]