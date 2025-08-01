import { useGoogleAuth } from "../../src/auth/GoogleAuthProvider";
import { fetchResumeData, initGapi } from "./GoogleSheet.tsx";
import { SPREADSHEET_ID } from "../infoSheet";
import { multaToSheet } from "../utils/multaToSheet";
import type { Rule } from "../../src/shared/types/rules.types.ts";
import type { Player } from "../../src/shared/types/players.types.ts";
import { getMoneyFromMulta } from "../../src/utils/multaCalculation.ts";
import type { Multa } from "../types/readSheet.types.ts";

export const useWriteMulta = () => {
  const { token, isSignedIn, login } = useGoogleAuth();
  const isLocalhost = window.location.hostname === "localhost";
  const range = isLocalhost ? "Testing!A1:J" : "Resume!A1:J";

  const appendMulta = async (rule: Rule, minsLate: number | undefined, date: Date, players: Player[]): Promise<boolean> => {
    let finalToken = token;
    let finalIsSignedIn = isSignedIn;

    const multasToSheet = []
    for(let i = 0; i < players.length; i++) {
      multasToSheet.push(multaToSheet({
        id: 0,
        player: players[i],
        rule: rule,
        date: date,
        minsLate: minsLate ?? 0,
        amount: getMoneyFromMulta(rule, minsLate), 
        paid: false,
        paidTo: undefined,
        paidOn: undefined,
        rejected: false
      }))
    }

    try {
      if (!finalIsSignedIn || !finalToken) {
        finalToken = await login();
        finalIsSignedIn = true
      }

      const multas = await fetchResumeData();
      const lastIndex = multas[multas.length - 1].id;
      for(let i = 1; i <= multasToSheet.length; i++) {
        multasToSheet[i-1][0] = (lastIndex + i).toString();
      }

      if (finalIsSignedIn) {
        await initGapi();
    
        window.gapi.client.setToken({ access_token: finalToken });
        const response = await window.gapi.client.sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: range,
          valueInputOption: "USER_ENTERED",
          insertDataOption: "INSERT_ROWS",
          resource: {
            values: multasToSheet,
          },
        });
        console.log("response", response)
        return true;
      }
    } catch (e) {
      console.error("error al añadir una multa", e)
      return false
    }
    return true;
  };

  const updateMulta = async (multa: Multa): Promise<boolean> => {
    let finalToken = token;
    let finalIsSignedIn = isSignedIn;

    const rangeToUpdate = `${isLocalhost ? 'Testing' : 'Resume'}!A${multa.id + 1}:J${multa.id + 1}`
    // return false
    try {

      if (!finalIsSignedIn || !finalToken) {
        finalToken = await login();
        finalIsSignedIn = true
      }

      if (finalIsSignedIn) {
        await initGapi();
    
        window.gapi.client.setToken({ access_token: finalToken });
        const response = await window.gapi.client.sheets.spreadsheets.values.update({
          spreadsheetId: SPREADSHEET_ID,
          range: rangeToUpdate,
          valueInputOption: "USER_ENTERED",
          resource: {
            values: [multaToSheet(multa)],
          },
        });
        console.log("response", response)
        return true;
      }
    } catch (e) {
      console.error("error al añadir una multa", e)
      return false
    }
    return true;
  };

  return { appendMulta, updateMulta };
};
