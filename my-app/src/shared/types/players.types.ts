export type Player = {
  name: string,
  shortName: string,
  number: number,
  password?: string,
  role: RoleV2[],
  personRole: PersonRole,
}

export const PersonRole = {
  player: 'player',
  coach: 'coach',
} as const

export type PersonRole = typeof PersonRole[keyof typeof PersonRole]

export const Role = {
  admin: 'admin',
  receiver: 'receiver',
  user: 'user',
} as const

export type Role = typeof Role[keyof typeof Role]

export type Permission =
  | "ADD_FINE"
  | "UPDATE_PAID_FINE"
  | "UPDATE_REJECT_FINE"
  | "VIEW_DASHBOARD";

export type RoleV2 = "USER" | "MODERATOR" | "ADMIN" | "SUPERADMIN";

export const rolePermissions: Record<RoleV2, Permission[]> = {
  USER: ["VIEW_DASHBOARD"],
  MODERATOR: ["VIEW_DASHBOARD", "ADD_FINE", "UPDATE_REJECT_FINE"],
  ADMIN: ["VIEW_DASHBOARD", "ADD_FINE", "UPDATE_REJECT_FINE", "UPDATE_PAID_FINE"],
  SUPERADMIN: ["VIEW_DASHBOARD", "ADD_FINE", "UPDATE_REJECT_FINE", "UPDATE_PAID_FINE"],
};

export const getPermissionsFromRoles = (player: Player | null): Permission[] => {
  if (!player || !Array.isArray(player.role)) return [];

  const permissionsSet = new Set<Permission>();

  player.role.forEach((role: RoleV2) => {
    const permissions = rolePermissions[role];
    permissions?.forEach(p => permissionsSet.add(p));
  });

  return Array.from(permissionsSet);
};