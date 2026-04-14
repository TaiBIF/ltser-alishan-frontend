import type { Lang } from "../context/LangContext";

type FaqTextKey = "fetchFailed" | "all" | "noData";

const FAQ_TEXT_MAP: Record<FaqTextKey, Record<Lang, string>> = {
    fetchFailed: {
        "zh-TW": "獲取資料失敗，請稍後再試",
        en: "Failed to fetch data. Please try again later.",
    },
    all: {
        "zh-TW": "全部",
        en: "ALL",
    },
    noData: {
        "zh-TW": "尚無任何常見問題",
        en: "No FAQ entries found.",
    },
};

const FAQ_CATEGORY_MAP: Record<string, Record<Lang, string>> = {};

export function getFaqText(lang: Lang, key: FaqTextKey) {
    return FAQ_TEXT_MAP[key][lang];
}

export function resolveFaqCategoryLabel(key: string, label: string, lang: Lang) {
    if (lang === "zh-TW") return label;

    const mapped = FAQ_CATEGORY_MAP[key]?.[lang];
    if (mapped) return mapped;

    if (key) {
        return key.replace(/[-_]+/g, " ").toUpperCase();
    }
    return label;
}
