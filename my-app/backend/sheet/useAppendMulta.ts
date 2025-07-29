import { useGoogleAuth } from "../../src/auth/GoogleAuthProvider";
import { initGapi } from "./GoogleSheet.tsx";
import { SPREADSHEET_ID } from "../infoSheet";
import { multaToSheet } from "../utils/multaToSheet";
import type { Multa } from "../types/readSheet.types";

export const useAppendMulta = () => {
  const { token, isSignedIn, login } = useGoogleAuth();

  const appendMulta = async (multa: Multa): Promise<boolean> => {
    let finalToken = token;
    let finalIsSignedIn = isSignedIn;

    try {
      if (!finalIsSignedIn || !finalToken) {
        finalToken = await login();
        finalIsSignedIn = true
      }

      if (finalIsSignedIn) {
        await initGapi();
    
        window.gapi.client.setToken({ access_token: finalToken });
    
        const response = await window.gapi.client.sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: "Resume!A:G",
          valueInputOption: "USER_ENTERED",
          insertDataOption: "INSERT_ROWS",
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

  return { appendMulta };
};
