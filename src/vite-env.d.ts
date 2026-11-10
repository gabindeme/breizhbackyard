/// <reference types="vite/client" />

// Globals read by Brevo's form script (https://sibforms.com/forms/end-form/build/main.js),
// set by the Inscriptions page.
interface Window {
  REQUIRED_CODE_ERROR_MESSAGE?: string;
  LOCALE?: string;
  EMAIL_INVALID_MESSAGE?: string;
  SMS_INVALID_MESSAGE?: string;
  REQUIRED_ERROR_MESSAGE?: string;
  GENERIC_INVALID_MESSAGE?: string;
  INVALID_NUMBER?: string;
  INVALID_DATE?: string;
  REQUIRED_MULTISELECT_MESSAGE?: string;
  AUTOHIDE?: boolean;
  translation?: {
    common: { selectedList: string; selectedLists: string; selectedOption: string; selectedOptions: string };
  };
}
