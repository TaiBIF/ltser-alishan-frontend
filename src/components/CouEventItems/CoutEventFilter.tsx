import { useState, useEffect } from "react";
import { API } from "../../config/api";

// types
import type { FilterField, FilterState } from "../../types/filter";
import type {
    EventItemType,
    // CouEventFilterType,
    CouEventFilterKeys,
} from "../../types/item";

// components
import { FilterPanel } from "../FilterPanel";

// helpers
import { swalToast } from "../../helpers/CustomSwal";
import { useLang } from "../../context/LangContext";
import {
    getCouEventText,
    resolveCouEventTypeLabel,
} from "../../i18n/couEvent";

interface CoutEventFilterProps {
    initialEvent: EventItemType[];
    onFiltered: (event: EventItemType[]) => void;
    resultRef?: React.RefObject<HTMLDivElement | null>;
}

async function fetchCategories() {
    const res = await fetch(API.cou.category);
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    return data.map((item: { key: string; name: string }) => ({
        label: item.name,
        value: item.key,
    }));
}

const initialFilter: FilterState<CouEventFilterKeys> = {
    content_keyword: "",
    location_keyword: "",
    start_date: null,
    end_date: null,
    category: null,
};

const formatDate = (d: Date) => d.toISOString().slice(0, 10);

const CoutEventFilter = ({
    initialEvent,
    onFiltered,
    resultRef,
}: CoutEventFilterProps) => {
    const { lang } = useLang();
    const [filter, setFilter] =
        useState<FilterState<CouEventFilterKeys>>(initialFilter);
    const [fields, setFields] = useState<FilterField<CouEventFilterKeys>[]>([]);

    const handleApply = async () => {
        const params = new URLSearchParams();

        if (filter.location_keyword && String(filter.location_keyword).trim()) {
            params.append(
                "location__icontains",
                String(filter.location_keyword).trim()
            );
        }

        if (filter.start_date instanceof Date) {
            params.append("date__gte", formatDate(filter.start_date));
        }
        if (filter.end_date instanceof Date) {
            params.append("date__lte", formatDate(filter.end_date));
        }

        if (Array.isArray(filter.category) && filter.category.length > 0) {
            const joined = filter.category.join(",");
            params.append("types", joined);
        }

        if (filter.content_keyword && String(filter.content_keyword).trim()) {
            params.append(
                "content__icontains",
                String(filter.content_keyword).trim()
            );
        }

        const query = params.toString();

        try {
            const res = await fetch(API.cou.data(query));
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            const results: EventItemType[] = data.results ?? [];
            onFiltered(results);
        } catch (err) {
            onFiltered([]);
            swalToast.fire({
                icon: "error",
                title: getCouEventText(lang, "queryFailed"),
            });
        } finally {
            if (resultRef?.current) {
                const offsetTop =
                    resultRef.current.getBoundingClientRect().top +
                    window.scrollY -
                    100;
                window.scrollTo({ top: offsetTop, behavior: "smooth" });
            }
        }
    };

    const handleClear = async () => {
        setFilter(initialFilter);
        onFiltered(initialEvent);
    };

    useEffect(() => {
        async function loadFields() {
            const categories = (await fetchCategories()).map((item) => ({
                ...item,
                label: resolveCouEventTypeLabel(item.value, item.label, lang),
            }));
            setFields([
                {
                    type: "date-range",
                    key: "date_range" as any,
                    label: getCouEventText(lang, "date"),
                    startKey: "start_date",
                    endKey: "end_date",
                },
                {
                    type: "text",
                    key: "content_keyword",
                    label: getCouEventText(lang, "keyword"),
                    col: "quarter",
                    placeholder: getCouEventText(lang, "keywordPlaceholder"),
                },
                {
                    type: "text",
                    key: "location_keyword",
                    label: getCouEventText(lang, "location"),
                    col: "quarter",
                    placeholder: getCouEventText(lang, "keywordPlaceholder"),
                },
                {
                    type: "checkbox-group",
                    key: "category",
                    label: getCouEventText(lang, "type"),
                    col: "full",
                    options: [...categories],
                },
            ]);
        }

        loadFields();
    }, [lang]);

    return (
        <FilterPanel<EventItemType, CouEventFilterKeys>
            fields={fields}
            filter={filter}
            setFilter={setFilter}
            onApply={() => handleApply()}
            onClear={handleClear}
            applyText={getCouEventText(lang, "search")}
            clearText={getCouEventText(lang, "clear")}
        />
    );
};

export default CoutEventFilter;
