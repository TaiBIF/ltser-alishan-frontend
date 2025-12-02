import type { QAType } from "../types/item";

export const qaTypeList = (): QAType[] => [
    {
        id: 1,
        type: "all",
        title_zh: "全部",
    },
    {
        id: 2,
        type: "web",
        title_zh: "網頁相關",
    },
];
