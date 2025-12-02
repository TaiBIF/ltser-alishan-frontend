import { Dispatch, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { FilterField, FilterValue } from "../types/filter";

type FilterState<K extends string = string> = Record<K, FilterValue>;

const colClassMap: Record<string, string> = {
    half: "w_50",
    quarter: "w_25",
};

export interface FilterPanelProps<TItem, K extends string = string> {
    fields: FilterField<K>[];
    filter: FilterState<K>;
    setFilter: Dispatch<SetStateAction<FilterState<K>>>;
    onApply: () => void;
    onClear: () => void;
}

export function FilterPanel<TItem, K extends string = string>({
    fields,
    filter,
    setFilter,
    onApply,
    onClear,
}: FilterPanelProps<TItem, K>) {
    const toggleArrayValue = (key: K, value: string | number) => {
        setFilter((prev) => {
            const current = (prev[key] as (string | number)[]) ?? [];
            const next = current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value];
            return { ...prev, [key]: next };
        });
    };

    return (
        <div className="event-filter-box">
            <div className="top-select-item">
                {fields.map((field) => {
                    if (field.type === "date-range") {
                        const start = filter[field.startKey] as Date | null;
                        const end = filter[field.endKey] as Date | null;
                        return (
                            <div key={field.key} className="item-set-date w_50">
                                <div className="title">
                                    <h2>{field.label}</h2>
                                    <div className="line" />
                                </div>
                                <div className="flex-box">
                                    <div className="input-item">
                                        <DatePicker
                                            selected={start}
                                            onChange={(date) =>
                                                setFilter((prev) => ({
                                                    ...prev,
                                                    [field.startKey]: date,
                                                }))
                                            }
                                            placeholderText="YYYY-MM-DD"
                                            dateFormat="yyyy-MM-dd"
                                            showYearDropdown
                                            dateFormatCalendar="MMMM"
                                            yearDropdownItemNumber={30}
                                            scrollableYearDropdown
                                        />
                                    </div>
                                    <span className="between-date-icon">~</span>
                                    <div className="input-item">
                                        <DatePicker
                                            selected={end}
                                            onChange={(date) =>
                                                setFilter((prev) => ({
                                                    ...prev,
                                                    [field.endKey]: date,
                                                }))
                                            }
                                            placeholderText="YYYY-MM-DD"
                                            dateFormat="yyyy-MM-dd"
                                            showYearDropdown
                                            dateFormatCalendar="MMMM"
                                            yearDropdownItemNumber={30}
                                            scrollableYearDropdown
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    if (field.type === "text") {
                        const value = (filter[field.key] as string) ?? "";
                        return (
                            <div
                                key={field.key}
                                className={`item-set ${
                                    colClassMap[field.col ?? ""] ?? ""
                                }`}
                            >
                                <div className="title">
                                    <h2>{field.label}</h2>
                                    <div className="line" />
                                </div>
                                <div className="input-item">
                                    <input
                                        type="text"
                                        value={value}
                                        placeholder={
                                            field.placeholder ?? "請輸入關鍵字"
                                        }
                                        onChange={(e) =>
                                            setFilter((prev) => ({
                                                ...prev,
                                                [field.key]: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                        );
                    }

                    if (field.type === "checkbox-group") {
                        const selections =
                            (filter[field.key] as (string | number)[]) ?? [];
                        return (
                            <div key={field.key} className="other-filter-item">
                                <div className="item-set">
                                    <div className="title">
                                        <h2>{field.label}</h2>
                                        <div className="line" />
                                    </div>
                                    <ul className="checkbox-ul">
                                        {field.options.map((opt) => (
                                            <li key={String(opt.value)}>
                                                <input
                                                    type="checkbox"
                                                    checked={selections.includes(
                                                        opt.value
                                                    )}
                                                    onChange={() =>
                                                        toggleArrayValue(
                                                            field.key,
                                                            opt.value
                                                        )
                                                    }
                                                />
                                                <p>{opt.label}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    }

                    return null;
                })}
            </div>

            <div className="flex-center btn-area">
                <button className="og-btn" onClick={onClear}>
                    清除
                </button>
                <button className="g-btn" onClick={onApply}>
                    搜尋
                </button>
            </div>
        </div>
    );
}
