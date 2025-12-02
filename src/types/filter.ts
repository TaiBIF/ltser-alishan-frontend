export type FilterValue =
    | string
    | number
    | boolean
    | Date
    | null
    | (string | number)[];

export type FilterFieldBase<K extends string = string> = {
    key: K; // 狀態用的鍵
    label: string; // 顯示標題
    col?: "full" | "half" | "quarter"; // 版面配置
};

export type TextField<K extends string = string> = FilterFieldBase<K> & {
    type: "text";
    placeholder?: string;
};

export type DateRangeField<K extends string = string> = FilterFieldBase<K> & {
    type: "date-range";
    startKey: K;
    endKey: K;
};

export type CheckboxGroupField<K extends string = string> =
    FilterFieldBase<K> & {
        type: "checkbox-group";
        options: { label: string; value: string | number }[];
    };

export type FilterField<K extends string = string> =
    | TextField<K>
    | DateRangeField<K>
    | CheckboxGroupField<K>;
