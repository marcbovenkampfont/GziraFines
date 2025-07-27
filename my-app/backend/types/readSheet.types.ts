import type { Player } from "../../src/shared/types/players.types";
import type { Rule } from "../../src/shared/types/rules.types";

export type Multa = {
    player: Player,
    rule: Rule,
    date: Date,
    minsLate: number,
    paid: boolean,
    rejected: boolean,
}
