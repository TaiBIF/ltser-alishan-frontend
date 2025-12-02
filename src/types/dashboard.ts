export type DashboardItemType = {
    id: string; // 對應 model 欄位
    type: string; // 表格渲染的樣式
    title: string; // 對應 Formik 欄位
    label: string; // 表格、表單單欄位名稱
    options?: RelateTypes[]; // 表單下拉選單選項
    readonly?: boolean;
    required?: boolean; // 表單上是否必填
    hints?: RelateTypes[];
    multiple?: boolean;
    cover?: number | string;
    fileType?: string;
    show: boolean; // 是否出現在表格
    space?: "text" | "date" | "nowrap";
    relate?: TypeItem[]; // 表格上呈現的選項
    param?: boolean;
    show_at_form?: boolean; // 是否出現在表單
};

export type DashboardFieldItemType = {
    id: string | number;
    type: string;
    title: string;
    label: string;
    options?: RelateTypes[];
    readonly?: boolean;
    required?: boolean;
    hints?: RelateTypes[];
    multiple?: boolean;
    cover?: number | string;
    fileType?: string;
};

type TypeItem = { id: string | number; title?: string; name?: string };

export type ColumnItemType = {
    id: string;
    title: string;
    show: boolean;
    space?: "text" | "date" | "nowrap";
    relate?: TypeItem[];
    param?: boolean;
};

export type RowItemType = {
    id: number;
    type: string;
    name: string;
    content: string;
    media: string;
};

export type RelateTypes = CategoryItemType | AttachmentItemType | any;

export type CategoryItemType = {
    [key: string]: any;
    id?: number | string;
    title: string;
    colorClass?: string;
};

export type AttachmentItemType = {
    id: number;
    type: string;
    title?: string;
    content?: string;
};

export type IntroductionFieldItemType = {
    type: string;
    name: string;
    name_en: string;
    content: string;
    content_en: string;
    image: string | File;
};

export type CouEventFieldItemType = {
    date: string;
    location: string;
    type: string;
    content: string;
    images: string[];
};
