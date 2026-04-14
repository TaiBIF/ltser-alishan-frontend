import type { Lang } from "../context/LangContext";

type LiteratureTextKey =
    | "fetchFailed"
    | "queryFailed"
    | "noData"
    | "date"
    | "keyword"
    | "type"
    | "keywordPlaceholder"
    | "search"
    | "clear";

const LITERATURE_TEXT_MAP: Record<LiteratureTextKey, Record<Lang, string>> = {
    fetchFailed: {
        "zh-TW": "獲取資料失敗，請稍後再試",
        en: "Failed to fetch data. Please try again later.",
    },
    queryFailed: {
        "zh-TW": "查詢資料失敗，請稍後再試",
        en: "Query failed. Please try again later.",
    },
    noData: {
        "zh-TW": "尚無任何相關文獻",
        en: "No literature found.",
    },
    date: {
        "zh-TW": "日期",
        en: "Date",
    },
    keyword: {
        "zh-TW": "關鍵字",
        en: "Keyword",
    },
    type: {
        "zh-TW": "類型",
        en: "Type",
    },
    keywordPlaceholder: {
        "zh-TW": "請輸入關鍵字",
        en: "Please enter keyword",
    },
    search: {
        "zh-TW": "搜尋",
        en: "Search",
    },
    clear: {
        "zh-TW": "清除",
        en: "Clear",
    },
};

const LITERATURE_TYPE_MAP: Record<string, Record<Lang, string>> = {};

export function getLiteratureText(lang: Lang, key: LiteratureTextKey) {
    return LITERATURE_TEXT_MAP[key][lang];
}

export function resolveLiteratureTypeLabel(
    key: string,
    label: string,
    lang: Lang,
) {
    if (lang === "zh-TW") return label;

    const mapped = LITERATURE_TYPE_MAP[key]?.[lang];
    if (mapped) return mapped;

    if (key) {
        return key.replace(/[-_]+/g, " ").toUpperCase();
    }
    return label;
}
