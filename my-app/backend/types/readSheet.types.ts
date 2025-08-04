import type { Player } from "../../src/shared/types/players.types";
import type { Rule } from "../../src/shared/types/rules.types";

export type Multa = {
    id: number,
    player: Player,
    rule: Rule,
    date: Date,
    amount: number,
    minsLate: number,
    paid: boolean,
    paidTo: Player | undefined,
    paidOn: Date | undefined,
    rejected: boolean,
}

export type Paid = {
    paid: boolean,
    paidTo: Player,
    paidOn: Date,
}

export const UpdateMultaType = {
  UPDATE_MULTA_PAID: "UpdateMultaPaid",
  UPDATE_MULTA_REJECT: "UpdateMultaReject",
} as const;

export type UpdateMultaType = (typeof UpdateMultaType)[keyof typeof UpdateMultaType];
