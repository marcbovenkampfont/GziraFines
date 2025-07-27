import type { Rule } from "../types/rules.types";

export const rulesList: Rule[] = [
  {
    name: 'Mobile ringing during Match Lecture/Talk',
    shortName: 'Mobile ringing Match',
    cost: 30,
  },
  {
    name: 'Calling on cell phone during Pre-Match/Half Time in dressing room',
    shortName: 'Call in Match',
    cost: 50,
  },
  {
    name: 'Answering cell phone during Pre-Match/Half Time in dressing room',
    shortName: 'Answer in Match',
    cost: 50,
  },
  {
    name: 'Late in pitch for training session without Notice/Physio Grant',
    shortName: 'Late in pitch training',
    cost: 50,
  },
  {
    name: 'Not Filling RPE Data',
    shortName: 'RPE',
    cost: 5,
  },
  {
    name: "Late In Dressing Room for Training (30' before) without Notice",
    shortName: 'Late DR training',
    cost: 20,
    multiplication: 5
  },
  {
    name: 'Late for Match',
    shortName: 'Late for Match',
    cost: 50,
    multiplication: 5
  },
  {
    name: 'Not full kit for pre-match',
    shortName: 'No kit pre-Match',
    cost: 50,
  },
  {
    name: 'Unrespectful attitude towards teammates or staff',
    shortName: 'Unrespectful attitude',
    cost: 50,
  },
  {
    name: 'No attending an official Club/Team Event',
    shortName: 'No attending Event',
    cost: 50,
  }
]
