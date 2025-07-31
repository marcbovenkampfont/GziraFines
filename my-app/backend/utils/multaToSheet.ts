import type { Multa } from '../types/readSheet.types.ts'
import { format } from "date-fns";

export const multaToSheet = (multa: Multa): string[] => {
    // Player - Violation Rule - Date - Mins Late - Penalty - Paid - Rejected { Receive by - Receive Date }
    const values = [
      multa.id.toString(),
      multa.player.name,
      multa.rule.name,
      format(multa.date, "dd-MM-yyy"),
      multa.minsLate !== 0 ? multa.minsLate.toString() : "",
      multa.amount.toString(),
      multa.paid ? "YES" : "NO",
      multa.paidTo?.name ?? "",
      multa.paidOn ? format(multa.date, "dd-MM-yyy") : "",
      multa.rejected ? "YES" : "NO",
    ];

    return values
}