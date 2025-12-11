// types
import type { BreadcrumbType } from "../types/item";

// data
import keventbn from "../assets/keventbn.jpg";

export const breadcrumbList = (): BreadcrumbType[] => [
    {
        id: 2,
        path: "/observation",
        title_zh: "觀測站資料",
        title_en: "OBSERVATION",
        bg_img: keventbn,
        list: [
            {
                id: 21,
                path: "/observation/ecology",
                title_zh: "生態觀測",
                title_en: "ECOLOGICAL\nOBSERVATION",
                bg_img: keventbn,
            },
            {
                id: 22,
                path: "/observation/environment",
                title_zh: "環境觀測",
                title_en: "ENVIRONMENTAL\nOBSERVATION",
                bg_img: keventbn,
            },
            {
                id: 23,
                path: "/observation/ecological-economics",
                title_zh: "生態經濟",
                title_en: "ECOLOGICAL\nECONOMICS",
                bg_img: keventbn,
            },
            {
                id: 24,
                path: "/observation/ecological-culture",
                title_zh: "經濟與文化面向",
                title_en: "ECOLOGICAL\nCULTURE",
                bg_img: keventbn,
            },
        ],
    },
    {
        id: 3,
        path: "/cou",
        title_zh: "鄒族記事",
        title_en: "COU",
        bg_img: keventbn,
        list: [
            {
                id: 31,
                path: "/cou/event",
                title_zh: "重要活動紀錄",
                title_en: "EVENTS",
                bg_img: keventbn,
            },
        ],
    },
    {
        id: 4,
        path: "/news",
        title_zh: "最新消息",
        title_en: "NEWS",
        bg_img: keventbn,
    },
    {
        id: 5,
        path: "/literature",
        title_zh: "相關文獻",
        title_en: "RELATED\nLITERATURES",
        bg_img: keventbn,
    },
    {
        id: 6,
        path: "/faq",
        title_zh: "常見Q&A",
        title_en: "QUESTIONS\n& ANSWERS",
        bg_img: keventbn,
    },
    {
        id: 7,
        path: "/contact",
        title_zh: "聯絡我們",
        title_en: "CONTACTS",
        bg_img: keventbn,
    },
    {
        id: 8,
        path: "/privacy-policy",
        title_zh: "隱私權政策",
        title_en: "PRIVACY POLICY",
        bg_img: keventbn,
    },
    {
        id: 9,
        path: "/terms-of-use",
        title_zh: "使用者條款",
        title_en: "TERMS OF USE",
        bg_img: keventbn,
    },
];
