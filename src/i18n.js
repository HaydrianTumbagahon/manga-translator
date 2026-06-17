import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';
import ar from './locales/ar.json';
import bn from './locales/bn.json';
import de from './locales/de.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import hi from './locales/hi.json';
import ms from './locales/ms.json';
import pt from './locales/pt.json';
import ru from './locales/ru.json';
import tr from './locales/tr.json';

const AVAILABLE_LANGUAGES = [
  'en',
  'ja',
  'ko',
  'zh-CN',
  'zh-TW',
  'ar',
  'bn',
  'de',
  'es',
  'fr',
  'hi',
  'ms',
  'pt',
  'ru',
  'tr',
];

const storedLanguage = localStorage.getItem('language');
const DEFAULT_LANGUAGE = AVAILABLE_LANGUAGES.includes(storedLanguage) ? storedLanguage : 'en';

const resources = {
  en: {
    translation: en,
  },
  ja: {
    translation: ja,
  },
  ko: {
    translation: ko,
  },
  'zh-CN': {
    translation: zhCN,
  },
  'zh-TW': {
    translation: zhTW,
  },
  ar: {
    translation: ar,
  },
  bn: {
    translation: bn,
  },
  de: {
    translation: de,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
  hi: {
    translation: hi,
  },
  ms: {
    translation: ms,
  },
  pt: {
    translation: pt,
  },
  ru: {
    translation: ru,
  },
  tr: {
    translation: tr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
