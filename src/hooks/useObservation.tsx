import { Field, ErrorMessage } from "formik";
import { useEffect, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";

// types
import type {
    ConvertedFieldItemType,
    FilterOptionType,
    HeaderItemType,
} from "../types/item";

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
            className="observation-date-input"
            wrapperClassName="observation-date-picker"
            calendarClassName="observation-date-calendar"
            popperClassName="observation-date-popper"
            popperPlacement="bottom-start"
            showYearDropdown
            dateFormatCalendar="MMMM"
            yearDropdownItemNumber={30}
            scrollableYearDropdown
        />
    );
};

type CustomDropdownProps = {
    id: string;
    value: string;
    options: FilterOptionType[];
    placeholder?: string;
    searchable?: boolean;
    onChange: (value: string) => void;
    onSearch?: (keyword: string) => void;
};

const CustomDropdown = ({
    id,
    value,
    options,
    placeholder = "全部",
    searchable = false,
    onChange,
    onSearch,
}: CustomDropdownProps) => {
    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const selectedOption = useMemo(
        () => options.find((option) => option.value === value),
        [options, value]
    );

    useEffect(() => {
        if (!open) return;

        const handleClick = (event: MouseEvent) => {
            if (!wrapperRef.current?.contains(event.target as Node)) {
                setOpen(false);
                setKeyword("");
            }
        };

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const openDropdown = () => {
        setOpen(true);
        if (searchable) onSearch?.(keyword);
    };

    const handleKeywordChange = (nextKeyword: string) => {
        setKeyword(nextKeyword);
        onChange(nextKeyword);
        onSearch?.(nextKeyword);
        setOpen(true);
    };

    const handleSelect = (nextValue: string) => {
        onChange(nextValue);
        setKeyword("");
        setOpen(false);
    };

    const inputValue = searchable ? value : selectedOption?.label ?? "";

    return (
        <div
            className={`custom-filter-dropdown${open ? " is-open" : ""}`}
            ref={wrapperRef}
        >
            <div className="custom-filter-dropdown__control">
                {searchable ? (
                    <input
                        id={id}
                        type="text"
                        value={inputValue}
                        placeholder={placeholder}
                        autoComplete="off"
                        onChange={(event) =>
                            handleKeywordChange(event.target.value)
                        }
                        onFocus={openDropdown}
                    />
                ) : (
                    <button
                        id={id}
                        type="button"
                        className={!value ? "is-placeholder" : ""}
                        onClick={() => {
                            if (open) {
                                setOpen(false);
                            } else {
                                openDropdown();
                            }
                        }}
                    >
                        {selectedOption?.label ?? placeholder}
                    </button>
                )}
                <span className="custom-filter-dropdown__arrow" />
            </div>

            {open && (
                <div className="custom-filter-dropdown__menu">
                    {!searchable && (
                        <button
                            type="button"
                            className={!value ? "is-selected" : ""}
                            onClick={() => handleSelect("")}
                        >
                            全部
                        </button>
                    )}
                    {options.length > 0 ? (
                        options.map((option) => (
                            <button
                                type="button"
                                key={option.value}
                                className={
                                    option.value === value ? "is-selected" : ""
                                }
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                            </button>
                        ))
                    ) : (
                        <div className="custom-filter-dropdown__empty">
                            無符合資料
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export function useFieldRenderer() {
    const renderInputByType = (
        field: ConvertedFieldItemType,
        options: FilterOptionType[] = [],
        onOptionSearch?: (field: ConvertedFieldItemType, keyword: string) => void
    ) => {
        const { key, label, type, filter_widget } = field;

        switch (type) {
            case "CharField":
            case "TextField":
                if (filter_widget === "select") {
                    return (
                        <li key={key}>
                            <p>{label}</p>
                            <Field name={key}>
                                {({ field: formikField, form }: any) => (
                                    <CustomDropdown
                                        id={key}
                                        value={formikField.value ?? ""}
                                        options={options}
                                        onChange={(value) =>
                                            form.setFieldValue(key, value)
                                        }
                                    />
                                )}
                            </Field>
                            <ErrorMessage name={key} component="small" />
                        </li>
                    );
                }

                if (filter_widget === "combobox") {
                    return (
                        <li key={key}>
                            <p>{label}</p>
                            <Field name={key}>
                                {({ field: formikField, form }: any) => (
                                    <CustomDropdown
                                        id={key}
                                        value={formikField.value ?? ""}
                                        options={options}
                                        placeholder={`請輸入${label}`}
                                        searchable
                                        onChange={(value) =>
                                            form.setFieldValue(key, value)
                                        }
                                        onSearch={(keyword) =>
                                            onOptionSearch?.(field, keyword)
                                        }
                                    />
                                )}
                            </Field>
                            <ErrorMessage name={key} component="small" />
                        </li>
                    );
                }

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
                        <Field name={key}>
                            {({ field: formikField, form }: any) => (
                                <CustomDropdown
                                    id={key}
                                    value={formikField.value ?? ""}
                                    options={[
                                        { label: "是", value: "true" },
                                        { label: "否", value: "false" },
                                    ]}
                                    onChange={(value) =>
                                        form.setFieldValue(key, value)
                                    }
                                />
                            )}
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
