import type { Lang } from "../context/LangContext";

type HeaderTextKey =
    | "logoSubtitle"
    | "logoTitle"
    | "couChronicle"
    | "majorEventRecord"
    | "formsAndLinks"
    | "language"
    | "contact"
    | "login"
    | "dashboard"
    | "logout";

const HEADER_TEXT_MAP: Record<HeaderTextKey, Record<Lang, string>> = {
    logoSubtitle: {
        "zh-TW": "LTSER INDEGENOUS - Alishan",
        en: "LTSER INDEGENOUS - Alishan",
    },
    logoTitle: {
        "zh-TW": "長期社會生態核心觀測 阿里山站",
        en: "Long-Term Social-Ecological Research Alishan",
    },
    couChronicle: {
        "zh-TW": "鄒族記事",
        en: "Cou Chronicle",
    },
    majorEventRecord: {
        "zh-TW": "重要活動紀錄",
        en: "Events",
    },
    formsAndLinks: {
        "zh-TW": "常用表單與連結",
        en: "Forms and Links",
    },
    language: {
        "zh-TW": "選擇語系",
        en: "Language",
    },
    contact: {
        "zh-TW": "聯絡我們",
        en: "Contact",
    },
    login: {
        "zh-TW": "登入",
        en: "Login",
    },
    dashboard: {
        "zh-TW": "後台",
        en: "Dashboard",
    },
    logout: {
        "zh-TW": "登出",
        en: "Logout",
    },
};

export function getHeaderText(lang: Lang, key: HeaderTextKey) {
    return HEADER_TEXT_MAP[key][lang];
}
