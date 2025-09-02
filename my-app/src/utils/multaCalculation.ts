import type { Multa } from "../../backend/types/readSheet.types";
import { players } from "../shared/constants/playersList";
import { rulesList } from "../shared/constants/rulesList";
import type { Player } from "../shared/types/players.types";
import type { Rule } from "../shared/types/rules.types";

export const getRuleByName = (ruleName: string): Rule | undefined => {
    return rulesList.find((rule) => rule.name === ruleName);
}

export const getPlayerFromName = (name: string): Player | undefined => {
  return players.find((player) => player.name === name)
}

export const getMoneyFromMulta = (rule: Rule, minsLate?: number): number => {
  if (rule.multiplication !== undefined && minsLate) {
    const multiplicator = 1 + Math.floor(minsLate / (rule.multiplication + 1));
    return rule.cost * multiplicator;
  }
  return rule.cost;
}

export const getKPI = (multas: Multa[]): number => {
  let total = 0;
  multas.forEach((multa) => {
    total += multa.amount;
  })
  return total
}