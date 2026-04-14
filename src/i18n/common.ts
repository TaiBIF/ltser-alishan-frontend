import type { Lang } from "../context/LangContext";

export type CommonTextKey =
    | "aboutLtser"
    | "ecologyCategory"
    | "environmentCategory"
    | "economicsCategory"
    | "observationStation"
    | "dataCatalog"
    | "ecologicalObservation"
    | "environmentalObservation"
    | "ecologicalEconomics"
    | "ecologyCulture"
    | "news"
    | "literature"
    | "faq";

const COMMON_TEXT_MAP: Record<CommonTextKey, Record<Lang, string>> = {
    aboutLtser: {
        "zh-TW": "關於LTSER_阿里山",
        en: "About LTSER_Alishan",
    },
    ecologyCategory: {
        "zh-TW": "生態觀測",
        en: "Ecological Observation",
    },
    environmentCategory: {
        "zh-TW": "環境觀測",
        en: "Environmental Observation",
    },
    economicsCategory: {
        "zh-TW": "生態經濟",
        en: "Ecological Economics",
    },
    observationStation: {
        "zh-TW": "觀測站資料",
        en: "Observation Data",
    },
    dataCatalog: {
        "zh-TW": "資料目錄",
        en: "Data Catalog",
    },
    ecologicalObservation: {
        "zh-TW": "生態觀測",
        en: "Ecological Observation",
    },
    environmentalObservation: {
        "zh-TW": "環境觀測",
        en: "Environmental Observation",
    },
    ecologicalEconomics: {
        "zh-TW": "生態經濟",
        en: "Ecological Economics",
    },
    ecologyCulture: {
        "zh-TW": "經濟與文化面向",
        en: "Ecology and Culture",
    },
    news: {
        "zh-TW": "最新消息",
        en: "News",
    },
    literature: {
        "zh-TW": "相關文獻",
        en: "Literature",
    },
    faq: {
        "zh-TW": "常見Q&A",
        en: "FAQ",
    },
};

export function getCommonText(lang: Lang, key: CommonTextKey) {
    return COMMON_TEXT_MAP[key][lang];
}
