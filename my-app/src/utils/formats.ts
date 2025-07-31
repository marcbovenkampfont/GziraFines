import { PersonRole, type Player } from "../shared/types/players.types"

export const moneyFormat = (value: number): string => {
    return value + ' €'
}

export const minutFormat = (value?: number): string => {
    return value !== null && value !== 0 ? `${value}'` : "-"
}

export const dateTableFormat = (date: Date): string => {
    return date.getDate() + '/' + date.toLocaleString('en-US', { month: 'short' })
}

export const dateFullFormat = (date: Date): string => {
    return date.getDate() + '/' + date.toLocaleString('en-US', {month: "long"}) + "/" + date.getFullYear()
}

export const parseDateFromString = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export const getTitleName = (playerLogged: Player, selector?: boolean): string => {
    if (playerLogged.personRole === PersonRole.player) {
        return `${playerLogged.name}${selector ? " -": ""} #${playerLogged.number}`
    } else if (playerLogged.personRole === PersonRole.coach) {
        return `${playerLogged.name}${selector ? " -": ""} #COACH`
    }
    return playerLogged.name;
}