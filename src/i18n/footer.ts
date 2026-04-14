import type { Lang } from "../context/LangContext";

type FooterTextKey =
    | "taibifManage"
    | "taibifName"
    | "taibifOrg"
    | "ccNotice"
    | "privacyPolicy"
    | "termsOfUse"
    | "copyright";

const FOOTER_TEXT_MAP: Record<FooterTextKey, Record<Lang, string>> = {
    taibifManage: {
        "zh-TW": "資料庫管理：",
        en: "Database Management:",
    },
    taibifName: {
        "zh-TW": "TaiBIF",
        en: "TaiBIF",
    },
    taibifOrg: {
        "zh-TW": "臺灣生物多樣性資訊機構",
        en: "Taiwan Biodiversity Information Facility",
    },
    ccNotice: {
        "zh-TW": "本站鄒族圖像皆由 許評註 創作 依 CC BY-NC-SA 3.0 TW 授權使用",
        en: "Indigenous Tsou images are created by 許評註 and licensed under CC BY-NC-SA 3.0 TW.",
    },
    privacyPolicy: {
        "zh-TW": "隱私權政策",
        en: "Privacy Policy",
    },
    termsOfUse: {
        "zh-TW": "使用者條款",
        en: "Terms of Use",
    },
    copyright: {
        "zh-TW": "©2025 LTSER 長期社會生態核心觀測 阿里山站",
        en: "©2025 LTSER Alishan",
    },
};

export function getFooterText(lang: Lang, key: FooterTextKey) {
    return FOOTER_TEXT_MAP[key][lang];
}
