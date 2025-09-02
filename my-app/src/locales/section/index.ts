import home from "./home";
import resume from "./resume";
import login from "./login";
import addFine from "./add-fine";
import table from "./table";
import modal from "./modal";
import reports from "./reports";

export default {
  es: { ...home.es, ...login.es, ...resume.es, ...addFine.es, ...table.es, ...modal.es, ...reports.es },
  en: { ...home.en, ...login.en, ...resume.en, ...addFine.en, ...table.en, ...modal.en, ...reports.en },
  it: { ...home.it, ...login.it, ...resume.it, ...addFine.it, ...table.it, ...modal.it, ...reports.it },
  pt: { ...home.pt, ...login.pt, ...resume.pt, ...addFine.pt, ...table.pt, ...modal.pt, ...reports.pt },
};
