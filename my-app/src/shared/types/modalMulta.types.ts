export const ModalType = {
  MULTA_RESUME: "MULTA_RESUME",
  MULTA_UPDATE: "MULTA_UPDATE",
  SETTINGS: "SETTINGS",
  NONE: "NONE"
} as const

export type ModalType = typeof ModalType[keyof typeof ModalType]