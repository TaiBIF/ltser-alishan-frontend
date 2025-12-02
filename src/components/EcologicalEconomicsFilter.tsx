import { useState } from "react";

// types
import type { FilterField } from "../types/filter";
import type {
    EcologicalEconomicsItemType,
    EcologicalEconomicsFilterType,
    EcologicalFilterKeys,
} from "../types/item";

// components
import { FilterPanel } from "../components/FilterPanel";

interface EcologicalEconomicsFilterProps {
    allEvent: EcologicalEconomicsItemType[];
    onFiltered: (interview: EcologicalEconomicsItemType[]) => void;
}

const fields: FilterField<EcologicalFilterKeys>[] = [
    {
        type: "date-range",
        key: "date_range" as any,
        label: "日期",
        startKey: "start_date",
        endKey: "end_date",
    },
    {
        type: "text",
        key: "content_keyword",
        label: "關鍵字",
        col: "half",
        placeholder: "請輸入關鍵字",
    },
];

const initialFilter: EcologicalEconomicsFilterType = {
    content_keyword: "",
    start_date: null,
    end_date: null,
};

function filterFn(
    item: EcologicalEconomicsItemType,
    filter: EcologicalEconomicsFilterType
): boolean {
    // 關鍵字（string | null）
    if (typeof filter.content_keyword === "string") {
        const content = filter.content_keyword.trim();
        if (content && !(item.content_keyword ?? "").includes(content)) {
            return false;
        }
    }

    // 日期（Date | null）
    if (item.date) {
        const item_date = item.date.getTime();
        if (
            filter.start_date instanceof Date &&
            item_date < filter.start_date.getTime()
        )
            return false;
        if (
            filter.end_date instanceof Date &&
            item_date > filter.end_date.getTime()
        )
            return false;
    }

    return true;
}

const EcologicalEconomicsFilter = ({
    allEvent,
    onFiltered,
}: EcologicalEconomicsFilterProps) => {
    const [filter, setFilter] =
        useState<EcologicalEconomicsFilterType>(initialFilter);

    const handleApply = (rows: EcologicalEconomicsItemType[]) =>
        onFiltered(rows);

    const handleClear = () => {
        setFilter(initialFilter);
        onFiltered(allEvent);
    };

    return (
        <FilterPanel<EcologicalEconomicsItemType, EcologicalFilterKeys>
            fields={fields}
            filter={filter}
            setFilter={setFilter}
            onApply={handleApply}
            onClear={handleClear}
            items={allEvent}
            filterFn={filterFn}
        />
    );
};

export default EcologicalEconomicsFilter;
