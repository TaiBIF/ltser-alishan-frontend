import { useState, useEffect } from "react";
import { API } from "../../config/api";

// types
import type { FilterField } from "../../types/filter";
import type {
    NewsItemType,
    NewsFilterType,
    NewsFilterKeys,
} from "../../types/item";

// components
import { FilterPanel } from "../FilterPanel";

// helpers
import { swalToast } from "../../helpers/CustomSwal";

interface NewsFilterProps {
    initialNews: NewsItemType[];
    onFiltered: (news: NewsItemType[]) => void;
    resultRef?: React.RefObject<HTMLDivElement>;
}

async function fetchCategories() {
    const res = await fetch(API.news.category);
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    return data.map((item: { key: string; name: string }) => ({
        label: item.name,
        value: item.key,
    }));
}

const initialFilter: NewsFilterType = {
    content_keyword: "",
    start_date: null,
    end_date: null,
    category: null,
};

const formatDate = (d: Date) => d.toISOString().slice(0, 10);

const NewsFilter = ({
    initialNews,
    onFiltered,
    resultRef,
}: NewsFilterProps) => {
    const [fields, setFields] = useState<FilterField<NewsFilterKeys>[]>([]);
    const [filter, setFilter] = useState<NewsFilterType>(initialFilter);

    const handleApply = async () => {
        const params = new URLSearchParams();

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

        if (filter.content_keyword && filter.content_keyword.trim()) {
            params.append("content__icontains", filter.content_keyword.trim());
        }

        const query = params.toString();

        try {
            const res = await fetch(API.news.data(query));
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            const results: NewsItemType[] = data.results ?? [];
            onFiltered(results);
        } catch (err) {
            onFiltered([]);
            swalToast.fire({
                icon: "error",
                title: "查詢資料失敗，請稍後再試",
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
        onFiltered(initialNews);
    };

    useEffect(() => {
        async function loadFields() {
            const categories = await fetchCategories();
            setFields([
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
                {
                    type: "checkbox-group",
                    key: "category",
                    label: "類型",
                    col: "full",
                    options: [...categories],
                },
            ]);
        }

        loadFields();
    }, []);

    return (
        <FilterPanel<NewsItemType, NewsFilterKeys>
            fields={fields}
            filter={filter}
            setFilter={setFilter}
            onApply={() => handleApply()}
            onClear={handleClear}
        />
    );
};

export default NewsFilter;
