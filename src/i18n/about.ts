import type { AboutApiItemType } from "../types/item";
import type { Lang } from "../context/LangContext";

type LangText = Record<Lang, string>;

const ABOUT_TYPE_TEXT_MAP: Record<string, LangText> = {
    ecology: {
        "zh-TW": "生態觀測",
        en: "Ecological Observation",
    },
    environment: {
        "zh-TW": "環境觀測",
        en: "Environmental Observation",
    },
    "ecological-economics": {
        "zh-TW": "生態經濟",
        en: "Ecological Economics",
    },
    "ecological-culture": {
        "zh-TW": "經濟與文化面向",
        en: "Ecology and Culture",
    },
};

const ABOUT_TITLE_TEXT_MAP: Record<string, LangText> = {
    camtrap: {
        "zh-TW": "自動相機",
        en: "Camera Trap",
    },
    weather: {
        "zh-TW": "氣象觀測",
        en: "Weather Observation",
    },
    "ecological-economics": {
        "zh-TW": "生態經濟",
        en: "Ecological Economics",
    },
    "ecological-culture": {
        "zh-TW": "經濟與文化面向",
        en: "Ecology and Culture",
    },
};

function humanizeSlug(slug: string) {
    return slug
        .split("-")
        .filter(Boolean)
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ");
}

export function resolveAboutCategory(type: string, lang: Lang) {
    return ABOUT_TYPE_TEXT_MAP[type]?.[lang] ?? "";
}

export function resolveAboutTitle(item: AboutApiItemType, lang: Lang) {
    const mapped = ABOUT_TITLE_TEXT_MAP[item.name_en]?.[lang];
    if (mapped) return mapped;

    if (lang === "zh-TW") {
        return item.name;
    }

    const englishFromApi = item.name_en?.trim();
    if (!englishFromApi) return item.name;

    // Fallback to a readable label if no explicit mapping is provided.
    return humanizeSlug(englishFromApi);
}
