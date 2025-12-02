import type { NewsType } from "../types/item";

export const newsTypeList = (): NewsType[] => [
    {
        id: 1,
        type: "all",
        title_zh: "全部",
    },
    {
        id: 2,
        type: "event",
        title_zh: "活動推廣",
    },
    {
        id: 3,
        type: "tribe",
        title_zh: "部落活動紀錄",
    },
    {
        id: 4,
        type: "environment",
        title_zh: "環境觀測紀錄",
    },
    {
        id: 5,
        type: "issue",
        title_zh: "在地議題討論",
    },
];
