import { englishMessages } from 'admin-on-rest';
import germanMessages from 'aor-language-german';
import webserviceMessages from './webserviceMessages';

const germanCustom = Object.assign({}, { ...germanMessages });
germanCustom.aor.page.dashboard = 'Startseite';
germanCustom.aor.navigation.no_results = 'Keine Ergebnisse';
germanCustom.aor.input.image.upload_several =
  'Zum Hochladen Dateien hineinziehen oder hier klicken, um Dateien auszuwählen.';
germanCustom.aor.input.image.upload_single =
  'Zum Hochladen Datei hineinziehen oder hier klicken, um Datei auszuwählen.';

// domain translations

const messages = {
  de: { ...germanCustom, ...webserviceMessages.de },
  en: { ...englishMessages, ...webserviceMessages.en }
};

export default messages;
