// types
import type { QAItemType } from "../types/item";

export const qaItemList = (): QAItemType[] => [
    {
        id: 1,
        published_at: "2025-09-24",
        type_zh: "網頁相關",
        type_id: 2,
        question: "網站可以下載觀測資料嗎？如何下載？",
        answer: "本平台網站的觀測資料任何人都可以在提供電子郵件信箱、姓名、身份與下載原因後下載取得，若您已是登入狀態，則系統會自動帶入您帳號的電子郵件信箱、姓名與身份等資訊，只需要自行補充下載原因。另外亦可於depositar網站中取得詮釋資料與觀測資料等檔案。",
    },
];
