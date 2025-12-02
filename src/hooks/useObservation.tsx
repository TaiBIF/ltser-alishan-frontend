import { Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";

// types
import type { ConvertedFieldItemType, HeaderItemType } from "../types/item";

const DateField: React.FC<{
    id: string;
    field: any;
    form: any;
    placeholderText: string;
}> = ({ id, field, form, placeholderText }) => {
    const handleDateChange = (val: any) => {
        if (val) {
            // 只保留日期部分
            const adjustedDate = new Date(
                val.getTime() - val.getTimezoneOffset() * 60000
            )
                .toISOString()
                .split("T")[0];
            form.setFieldValue(id, adjustedDate);
        } else {
            form.setFieldValue(id, val);
        }
    };

    return (
        <DatePicker
            {...field}
            selected={field.value ? new Date(field.value) : null}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
            placeholderText={placeholderText}
            showYearDropdown
            dateFormatCalendar="MMMM"
            yearDropdownItemNumber={30}
            scrollableYearDropdown
        />
    );
};

export function useFieldRenderer() {
    const renderInputByType = (field: ConvertedFieldItemType) => {
        const { key, label, type } = field;

        switch (type) {
            case "CharField":
                return (
                    <li key={key}>
                        <p>{label}</p>
                        <Field type="text" id={key} name={key} />
                        <ErrorMessage name={key} component="small" />
                    </li>
                );

            case "FloatField":
                return (
                    <li key={key}>
                        <p>{label}</p>
                        <Field type="number" id={key} name={key} />
                        <ErrorMessage name={key} component="small" />
                    </li>
                );

            case "DateField":
                return (
                    <li key={key}>
                        <p>{label}</p>
                        <Field name={key}>
                            {({ field, form }: any) => (
                                <DateField
                                    id={key}
                                    field={field}
                                    form={form}
                                    placeholderText={`請選擇${label}`}
                                />
                            )}
                        </Field>
                        <ErrorMessage name={key} component="small" />
                    </li>
                );

            case "BooleanField":
                return (
                    <li key={key}>
                        <p>{label}</p>
                        <Field as="select" id={key} name={key}>
                            <option value="">全部</option>
                            <option value="true">是</option>
                            <option value="false">否</option>
                        </Field>
                    </li>
                );

            default:
                return null;
        }
    };

    return { renderInputByType };
}

export function renderCell(value: unknown) {
    if (value == null) return "";
    if (typeof value === "object") {
        try {
            return JSON.stringify(value);
        } catch {
            return String(value);
        }
    }
    return String(value);
}

const formatDate = (d: any) => {
    // 如果是 Date 物件，轉成 YYYY-MM-DD
    if (d instanceof Date && !isNaN(d as any)) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }
    // 如果是字串直接回傳
    return d;
};

export function buildQueryParams(
    base: { page: number; page_size: number },
    headers: HeaderItemType[],
    values: Record<string, any>
) {
    const params = new URLSearchParams();
    params.set("page", String(base.page));
    params.set("page_size", String(base.page_size));

    headers.forEach((h) => {
        const raw = values?.[h.key];
        if (raw === "" || raw === null || raw === undefined) return;

        switch (h.type) {
            case "CharField":
            case "TextField": {
                // 若後端支援 django-filter，可用 __icontains
                // params.set(`${h.key}__icontains`, String(raw));
                params.set(h.key, String(raw)); // 後端只支援精確匹配就用這個
                break;
            }
            case "IntegerField":
            case "FloatField":
            case "DecimalField": {
                const n = Number(raw);
                if (!Number.isNaN(n)) params.set(h.key, String(n));
                break;
            }
            case "BooleanField": {
                // 你的 select 是 "true"/"false"/""，空字串前面已經被 return
                if (raw === "true" || raw === true) params.set(h.key, "true");
                else if (raw === "false" || raw === false)
                    params.set(h.key, "false");
                break;
            }
            case "DateField":
            case "DateTimeField": {
                const v = formatDate(raw);
                if (v) params.set(h.key, String(v));
                break;
            }
            default:
                // 遇到不支援的型別就直接字串化
                params.set(h.key, String(raw));
        }
    });

    return params.toString();
}
