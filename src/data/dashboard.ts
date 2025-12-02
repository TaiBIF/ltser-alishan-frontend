// types
import type {
    DashboardFieldItemType,
    RelateTypes,
    ColumnItemType,
    DashboardItemType,
} from "../types/dashboard";

export const introductionTypeList: RelateTypes[] = [
    {
        id: "ecology",
        title: "生態觀測",
    },
    {
        id: "environment",
        title: "環境觀測",
    },
    {
        id: "ecological-economics",
        title: "生態經濟",
    },
    {
        id: "ecological-culture",
        title: "經濟與文化面向",
    },
];

export const introductionTableColumnList: ColumnItemType[] = [
    {
        id: "id",
        title: "編號",
        show: true,
        param: true,
    },
    {
        id: "type",
        title: "觀測類型",
        show: true,
        space: "nowrap",
        relate: introductionTypeList,
    },
    {
        id: "name",
        title: "觀測項目名稱",
        show: true,
        space: "text",
    },
    {
        id: "media_url",
        title: "觀測項目介紹圖片",
        show: true,
    },
];

export const introductionEditFieldList: DashboardFieldItemType[] = [
    {
        id: "1",
        type: "select",
        title: "type",
        label: "觀測類型",
        readonly: false,
        required: true,
        options: introductionTypeList,
    },
    {
        id: "2",
        type: "textarea",
        title: "name",
        label: "觀測項目名稱",
        readonly: false,
        required: true,
    },
    {
        id: "2-1",
        type: "textarea",
        title: "name_en",
        label: "觀測項目名稱 (英文)",
        readonly: false,
        required: true,
    },
    {
        id: "3",
        type: "textarea",
        title: "content",
        label: "觀測項目簡介",
        readonly: false,
        required: true,
    },
    {
        id: "3-1",
        type: "textarea",
        title: "content_en",
        label: "觀測項目簡介 (英文)",
        readonly: false,
        required: true,
    },
    {
        id: "4",
        type: "file",
        title: "image",
        label: "觀測項目介紹圖片",
        readonly: false,
        required: true,
        fileType: "image",
        hints: [
            {
                id: "link",
                title: "目前檔案:",
            },
        ],
    },
];

export const couEventTypeList: RelateTypes[] = [
    {
        id: "event",
        title: "活動參與",
    },
    {
        id: "promotion",
        title: "推廣介紹",
    },
    {
        id: "training",
        title: "培力",
    },
    {
        id: "meeting",
        title: "會談諮詢",
    },
];

export const couEventTableColumnList: DashboardItemType[] = [
    {
        id: "id",
        title: "id",
        show: true,
        param: true,
        type: "text",
        label: "編號",
        readonly: true,
        required: false,
        show_at_form: false,
    },
    {
        id: "date",
        title: "date",
        show: true,
        type: "date",
        label: "事件日期",
        readonly: false,
        required: true,
    },
    {
        id: "location",
        title: "location",
        show: true,
        type: "text",
        label: "地點",
        readonly: false,
        required: true,
    },
    {
        id: "type",
        title: "type",
        show: true,
        type: "select",
        label: "項目",
        readonly: false,
        required: true,
        options: couEventTypeList,
        relate: couEventTypeList,
    },
    {
        id: "content",
        title: "content",
        show: true,
        space: "text",
        type: "textarea",
        label: "事件說明",
        readonly: false,
        required: true,
    },
    {
        id: "images",
        type: "file",
        title: "images",
        show: false,
        label: "影像記錄",
        readonly: false,
        required: true,
        fileType: "image",
        multiple: true,
        hints: [
            {
                id: "images",
                title: "目前檔案:",
            },
        ],
    },
];
