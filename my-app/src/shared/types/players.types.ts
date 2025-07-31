export type Player = {
  name: string,
  number: number,
  password?: string,
  role: Role[],
  personRole: PersonRole,
}

export const PersonRole = {
  player: 'player',
  coach: 'coach',
} as const

export type PersonRole = typeof PersonRole[keyof typeof PersonRole]

export const Role = {
  admin: 'admin',
  user: 'user',
} as const

export type Role = typeof Role[keyof typeof Role]
