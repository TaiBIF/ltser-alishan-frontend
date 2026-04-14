import type { Lang } from "../context/LangContext";

type CouEventTextKey =
    | "fetchFailed"
    | "queryFailed"
    | "noData"
    | "date"
    | "keyword"
    | "location"
    | "type"
    | "keywordPlaceholder"
    | "tableDate"
    | "tableLocation"
    | "tableItem"
    | "tableDescription"
    | "tableImageRecord"
    | "search"
    | "clear";

const COU_EVENT_TEXT_MAP: Record<CouEventTextKey, Record<Lang, string>> = {
    fetchFailed: {
        "zh-TW": "獲取資料失敗，請稍後再試",
        en: "Failed to fetch data. Please try again later.",
    },
    queryFailed: {
        "zh-TW": "查詢資料失敗，請稍後再試",
        en: "Query failed. Please try again later.",
    },
    noData: {
        "zh-TW": "尚無任何活動紀錄",
        en: "No event records found.",
    },
    date: {
        "zh-TW": "日期",
        en: "Date",
    },
    keyword: {
        "zh-TW": "關鍵字",
        en: "Keyword",
    },
    location: {
        "zh-TW": "地點",
        en: "Location",
    },
    type: {
        "zh-TW": "類型",
        en: "Type",
    },
    keywordPlaceholder: {
        "zh-TW": "請輸入關鍵字",
        en: "Please enter keyword",
    },
    tableDate: {
        "zh-TW": "日期",
        en: "Date",
    },
    tableLocation: {
        "zh-TW": "地點",
        en: "Location",
    },
    tableItem: {
        "zh-TW": "類型",
        en: "Type",
    },
    tableDescription: {
        "zh-TW": "說明",
        en: "Description",
    },
    tableImageRecord: {
        "zh-TW": "影像記錄",
        en: "Images",
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

const COU_EVENT_TYPE_MAP: Record<string, Record<Lang, string>> = {};

export function getCouEventText(lang: Lang, key: CouEventTextKey) {
    return COU_EVENT_TEXT_MAP[key][lang];
}

export function resolveCouEventTypeLabel(
    key: string,
    label: string,
    lang: Lang,
) {
    if (lang === "zh-TW") return label;

    const mapped = COU_EVENT_TYPE_MAP[key]?.[lang];
    if (mapped) return mapped;

    if (key) {
        return key.replace(/[-_]+/g, " ").toUpperCase();
    }
    return label;
}
