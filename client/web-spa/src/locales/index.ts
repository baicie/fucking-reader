import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import cn from './cn'
import en from './en'
import fr from './fr'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      cn: {
        translation: cn,
      },
      fr: {
        translation: fr,
      },
    },
    lng: 'cn',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
