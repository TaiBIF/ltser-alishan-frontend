import DatePicker from "react-datepicker";
import type { Dispatch, SetStateAction } from "react";

// css
import "react-datepicker/dist/react-datepicker.css";

// types
import type { NewsFilterType } from "../types/item";

// components
import DateIcon from "./Icons/DateIcon";

type CustomDatePickerProps = {
    filter: NewsFilterType;
    setFilter: Dispatch<SetStateAction<NewsFilterType>>;
};

const formatDate = (d: Date | null): string | undefined => {
    if (!d) return undefined;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
};

const placeholderText = "YYYY-MM-DD";

const CustomDatePicker = ({ filter, setFilter }: CustomDatePickerProps) => {
    // 日期處理
    const handleStartDateChange = (date: Date | null) => {
        setFilter((prev: NewsFilterType) => ({
            ...prev,
            startDate: formatDate(date),
        }));
    };

    const handleEndDateChange = (date: Date | null) => {
        setFilter((prev: NewsFilterType) => ({
            ...prev,
            endDate: formatDate(date),
        }));
    };

    const handleDateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submit filter:", filter);
    };
    return (
        <form className="tool-select c-form" onSubmit={handleDateSubmit}>
            <div className="date-box">
                <div className="inp-item c-form__set">
                    <DatePicker
                        selected={
                            filter.startDate ? new Date(filter.startDate) : null
                        }
                        onChange={handleStartDateChange}
                        placeholderText={placeholderText}
                        dateFormat="yyyy-MM-dd"
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        yearDropdownItemNumber={30}
                        scrollableYearDropdown
                        className="c-form__date"
                    />
                    <div className="c-form__icon">
                        <DateIcon />
                    </div>
                </div>
                <span>～</span>
                <div className="inp-item c-form__set">
                    <DatePicker
                        selected={
                            filter.endDate ? new Date(filter.endDate) : null
                        }
                        onChange={handleEndDateChange}
                        placeholderText={placeholderText}
                        dateFormat="yyyy-MM-dd"
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        yearDropdownItemNumber={30}
                        scrollableYearDropdown
                        className="c-form__date"
                    />
                    <div className="c-form__icon">
                        <DateIcon />
                    </div>
                </div>
            </div>
            {/* <button type="submit" className="submit-btn">
                篩選
            </button> */}
        </form>
    );
};

export default CustomDatePicker;
