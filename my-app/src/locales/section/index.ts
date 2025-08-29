import home from "./home";
import resume from "./resume";
import login from "./login";
import addFine from "./add-fine";
import table from "./table";
import modal from "./modal";

export default {
  es: { ...home.es, ...login.es, ...resume.es, ...addFine.es, ...table.es, ...modal.es },
  en: { ...home.en, ...login.en, ...resume.en, ...addFine.en, ...table.en, ...modal.en },
};
