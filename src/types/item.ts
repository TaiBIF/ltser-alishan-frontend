import type { FilterValue, FilterState } from "./filter";

export type BreadcrumbType = {
    id: number | string;
    path: string;
    title_zh: string;
    title_en: string;
    bg_img: string;
    list?: BreadcrumbType[];
};

export type NewsType = {
    id: number | string;
    type: string;
    title_zh: string;
};

export type NewsItemType = {
    id: number;
    date: string;
    title: string;
    content: string;
    types_display: string[];
    cover_image?: { id: number; image: string }[];
    images?: { id: number; image: string }[];
};

export type AboutItemType = {
    id: number;
    path: string;
    type_zh: string;
    title: string;
    content: string;
    bg_img: string;
};

export type AboutApiItemType = {
    id: number;
    type:
        | "ecology"
        | "environment"
        | "ecological-economics"
        | "ecological-culture"
        | string;
    name: string;
    name_en: string;
    content: string;
    content_en: string;
    media_url: string;
};

export type ContactItemType = {
    id: number;
    role: string;
    university: string;
    department: string;
    position: string;
    name: string;
    mail: string;
    image: string;
    sort_order: number;
};

export type QAType = {
    id: number;
    types_display: string[];
    types: string[];
    question: string;
    answer: string;
};

export type CategoryType = { key: string; name: string };

export type QAItemType = {
    id: number;
    published_at: string;
    type_zh: string;
    type_id: number;
    question: string;
    answer: string;
};

export type EventItemType = {
    id: number;
    date: string;
    location: string;
    types_display: string[];
    content: string;
    images?: { id: number; image: string }[];
};

export type AsideItemType = {
    id: number;
    title: string;
    key: string;
    link?: string;
    list?: AsideItemType[];
};

export type EcologicalEconomicsItemType = {
    content_keyword: string;
    date: Date | null;
};

export type EcologicalFilterKeys =
    | "content_keyword"
    | "start_date"
    | "end_date";

export type EcologicalEconomicsFilterType = FilterState<EcologicalFilterKeys>;

export type LiteratureItemType = {
    id: number | string;
    title: string;
    author: string;
    published_year: number;
    affiliation: string;
    link: string;
    types_display: string[];
};

export type LiteratureFilterKeys =
    | "content_keyword"
    | "start_date"
    | "end_date"
    | "category";

export type LiteratureFilterType = FilterState<LiteratureFilterKeys>;

export type NewsFilterKeys =
    | "content_keyword"
    | "start_date"
    | "end_date"
    | "category";

export type NewsFilterType = FilterState<NewsFilterKeys>;

export type CouEventFilterKeys =
    | "content_keyword"
    | "location_keyword"
    | "start_date"
    | "end_date"
    | "category";

export type CouEventFilterType = FilterState<CouEventFilterKeys>;

export type HeaderItemType = {
    key: string; // 對應資料表的的欄位名稱
    label: string; // 顯示文字
    type: string; // 欄位類型
};

export type FieldItemType = {
    id: number;
    field_name: string;
    field_name_zh_tw?: string | null;
    field_name_en?: string | null;
    field_type?: string | null;
    show_at_table?: boolean | null;
    show_at_filter?: boolean | null;
};

export type ConvertedFieldItemType = {
    key: string;
    label: string;
    type: string;
};

export type LocationItemType = {
    id: number;
    location_id: string;
    location_name: string;
    decimal_latitude: string;
    decimal_longitude: string;
};

export type RowItemType = Record<string, unknown>;

export type FilterItemType = Record<string, FilterValue>;
