export const moneyFormat = (value: number): string => {
    return value + ' €'
}

export const minutFormat = (value?: number): string => {
    return value !== null && value !== 0 ? `${value}'` : "-"
}

export const dateTableFormat = (date: Date): string => {
    return date.getDate() + '/' + date.toLocaleString('en-US', { month: 'short' })
}

export const parseDateFromString = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}