import type { Lang } from "../context/LangContext";

type HomeSectionTextKey =
    | "homeNewsTitle"
    | "all"
    | "noRelatedNews"
    | "surveyMapTitle"
    | "yearItemFilter"
    | "allObservationItems"
    | "none"
    | "joinUsTitle"
    | "joinUsDesc"
    | "contactInfo"
    | "dataUsage"
    | "learnMore";

const HOME_SECTION_TEXT_MAP: Record<HomeSectionTextKey, Record<Lang, string>> =
    {
        homeNewsTitle: {
            "zh-TW": "最新消息",
            en: "News",
        },
        all: {
            "zh-TW": "全部",
            en: "ALL",
        },
        noRelatedNews: {
            "zh-TW": "尚無相關最新消息",
            en: "No related news.",
        },
        surveyMapTitle: {
            "zh-TW": "觀測站地圖",
            en: "Survey Map",
        },
        yearItemFilter: {
            "zh-TW": "年份/觀測項目篩選",
            en: "Year / Observation Item Filter",
        },
        allObservationItems: {
            "zh-TW": "全部觀測項目",
            en: "All Observation Items",
        },
        none: {
            "zh-TW": "無",
            en: "None",
        },
        joinUsTitle: {
            "zh-TW": "加入我們",
            en: "Join Us",
        },
        joinUsDesc: {
            "zh-TW": "加入我們，一起探索臺灣原住民的社會生態系統",
            en: "Join us to explore Taiwan Indigenous social-ecological systems.",
        },
        contactInfo: {
            "zh-TW": "聯絡資訊",
            en: "Contact Info",
        },
        dataUsage: {
            "zh-TW": "資料使用說明",
            en: "Data Usage",
        },
        learnMore: {
            "zh-TW": "了解更多",
            en: "Learn More",
        },
    };

const HOME_NEWS_CATEGORY_MAP: Record<string, Record<Lang, string>> = {};
const SURVEY_ITEM_MAP: Record<string, Record<Lang, string>> = {};

export function getHomeSectionText(lang: Lang, key: HomeSectionTextKey) {
    return HOME_SECTION_TEXT_MAP[key][lang];
}

export function resolveHomeNewsCategoryLabel(
    key: string,
    label: string,
    lang: Lang,
) {
    if (lang === "zh-TW") return label;

    const mapped = HOME_NEWS_CATEGORY_MAP[label]?.[lang];
    if (mapped) return mapped;

    return key.replace(/[-_]+/g, " ").toUpperCase();
}

export function resolveSurveyItemLabel(label: string, lang: Lang) {
    if (lang === "zh-TW") return label;
    return SURVEY_ITEM_MAP[label]?.[lang] ?? label;
}

const HOME_INTRO_DESCRIPTION: Record<Lang, string> = {
    "zh-TW":
        "阿里山鄉是結合山地生態、人類聚落與農業生產的里山地區，擁有豐富的自然與文化資源，也是一個典型的社會生態系統。目前，阿里山正面臨氣候變遷與治理機制轉型的雙重挑戰。極端天氣如豪雨、乾旱與颱風，已對農業、交通、觀光、歲時祭儀及傳統文化活動造成潛在衝擊；同時，隨著轉型正義與自然資源共管政策推動，政府與原住民族之間的治理關係也逐步調整。近年林業及自然保育署推動原住民狩獵自主管理計畫，並成立嘉義縣鄒族獵人協會，開啟政府與部落共管自然資源的新模式。這些變化不僅影響狩獵文化、祭儀活動與文化體驗，也牽動原住民族文化價值、傳統領域生態價值與地方經濟發展。\n\n為深入理解阿里山此一特殊社會生態系統，本計畫將從自然、社會與制度三個面向進行長期研究。在自然面，關注森林生態系、生物多樣性及其時空變化；在社會面，探討部落如何運用生態系統服務發展生計，例如林下經濟與生態旅遊；在制度面，分析森林政策、原住民族基本法與自然資源共管制度等，如何影響資源利用、生態系統服務供給與在地福祉。期望透過長期監測，掌握阿里山社會生態系統的動態，作為未來區域永續發展與生態保育政策的重要依據。",
    en: "Alishan Township is a satoyama landscape where mountain ecosystems, human settlements, and agricultural production are closely interconnected. Rich in both natural and cultural resources, it represents a distinctive social-ecological system. Today, Alishan faces two major challenges: climate change and shifts in governance. Extreme weather events, such as heavy rainfall, droughts, and typhoons, are increasingly affecting agriculture, transportation, tourism, seasonal rituals, and traditional cultural practices. At the same time, broader efforts toward transitional justice and co-management of natural resources are reshaping the relationship between the government and Indigenous communities. In recent years, the Forestry and Nature Conservation Agency has launched an Indigenous hunting self-management program in Alishan and supported the establishment of the Chiayi Tsou Hunters Association. This marks a new model of shared governance between government agencies and local communities in managing natural resources. These changes may influence hunting traditions, ritual practices, cultural tourism, Indigenous cultural values, the ecological value of traditional territories, and the local economy.\n\nTo better understand this unique social-ecological system, this project takes a long-term, interdisciplinary approach across three dimensions: ecological, social, and institutional. Ecologically, it examines changes in forest ecosystems and biodiversity over time and across space. Socially, it explores how local communities build livelihoods through ecosystem services, including forest-based traditional economies and ecotourism. Institutionally, it analyzes how local rules and broader policies—such as national forest policy, the Indigenous Peoples Basic Law, and natural resource co-management frameworks—shape resource use, ecosystem services, and community well-being. Through long-term monitoring, the project aims to provide a more complete understanding of the changing dynamics of Alishan and to support policies that balance ecological conservation with community development.",
};

export function getHomeIntroDescription(lang: Lang) {
    return HOME_INTRO_DESCRIPTION[lang];
}
