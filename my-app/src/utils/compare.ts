import type { Player } from "../shared/types/players.types";

export const comparePlayers = (a: Player, b: Player): boolean => {
    return a.name === b.name && a.number === b.number;
}