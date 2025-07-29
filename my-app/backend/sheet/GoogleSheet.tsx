import { parseDateFromString } from "../../src/utils/formats.ts";
import { getPlayerFromName, getRuleByName } from "../../src/utils/multaCalculation.ts";
import { API_KEY, SPREADSHEET_ID } from "../infoSheet";
import type { Multa } from '../types/readSheet.types.ts'

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

const loadGapiScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
    if (typeof window.gapi !== 'undefined') {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Error al cargar el script de GAPI'))
    document.body.appendChild(script)
  })
}

export const initGapi = async () => {
  await loadGapiScript();
  return new Promise((resolve, reject) => {
    window.gapi.load('client', async () => {
      try {
        await window.gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        })

        resolve(true)
      } catch (e) {
        reject(e)
      }
    })
  })
}

export const fetchResumeData = async () => {
  try {
      await initGapi();
      const spreadsheet = await window.gapi.client.sheets.spreadsheets.get({
          spreadsheetId: SPREADSHEET_ID,
      });

      const sheets = spreadsheet.result.sheets;
      const datosSheet = sheets.find(
          (s: any) => s.properties.title === "Resume"
      );

      if (!datosSheet) {
          alert('❌ La hoja "Resume" no existe');
          return;
      }

      const multas = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "Resume!A1:G",
      }).then((response: any) => {
          const lines = response.result.values;
          const multas: Multa[] = []
          for (let i = 1; i < lines.length; i++) {
              const line = lines[i]
              const player = getPlayerFromName(line[0])
              const rule = getRuleByName(line[1])
              const date = parseDateFromString(line[2])
              const minsLate: number = line[3] !== "" ? parseInt(line[3]) : 0;
              const amount: number = line[4] !== "" ? parseInt(line[4]) : 0;
              const paid = line[5].toUpperCase() === "YES" ? true : false;
              const rejected = line[6].toUpperCase() === "YES" ? true : false;

              if (player && rule) {
                  multas.push({
                    player: player,
                    rule: rule,
                    date: date,
                    minsLate: minsLate,
                    amount: amount,
                    paid: paid,
                    rejected: rejected,
                  })
              }
          }
          return multas;
      });
      return multas.filter((m: Multa) => m.rejected === false);
  } catch (err) {
      console.error("Error al acceder a la hoja", err);
  } 
};

