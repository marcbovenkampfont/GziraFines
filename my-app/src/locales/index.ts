/* istanbul ignore file */
import pages from "./section";
import shared from "./shared";

const messages = {
  es: {
    ...shared.es,
    ...pages.es,
  },
  en: {
    ...shared.en,
    ...pages.en,
  },
};

export const getLocales = () => Object.keys(messages);

export default messages;
