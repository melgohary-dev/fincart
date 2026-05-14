import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageCode } from '@/types';

/**
 * Language management hook.
 *
 * Provides the current language code, an RTL flag, and a toggle
 * function that cycles between English and Arabic.  The underlying
 * `i18n.changeLanguage()` call triggers the `languageChanged` event
 * in `@/i18n`, which updates the `<html>` `dir` / `lang` attributes
 * and the Emotion cache provider in `main.tsx`.
 */
export function useLanguage() {
  const { i18n } = useTranslation();

  const currentLang = i18n.language as LanguageCode;

  const isRTL = currentLang === LanguageCode.Arabic;

  const toggleLanguage = useCallback(() => {
    const next = currentLang === LanguageCode.English ? LanguageCode.Arabic : LanguageCode.English;
    i18n.changeLanguage(next);
  }, [currentLang, i18n]);

  return { currentLang, isRTL, toggleLanguage };
}
