import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { LanguageCode } from '@/types';

/**
 * i18next initialisation with lazy-loaded JSON translation files.
 *
 * Translation namespaces are loaded on demand via `i18next-resources-to-backend`
 * so that the initial bundle stays small.  The `languageChanged` event is
 * used to keep the `<html>` element's `lang` and `dir` attributes in sync
 * with the active locale — this is critical for MUI's RTL support and
 * browser-native text direction.
 */
i18n
  .use(resourcesToBackend((lng: string, ns: string) => import(`../locales/${lng}/${ns}.json`)))
  .use(initReactI18next)
  .init({
    fallbackLng: LanguageCode.English,
    supportedLngs: [LanguageCode.English, LanguageCode.Arabic],
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language;
  document.documentElement.dir = language === LanguageCode.Arabic ? 'rtl' : 'ltr';
});

export default i18n;
