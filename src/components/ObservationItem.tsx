import { useEffect, useState, useMemo, useRef } from "react";
import { API } from "../config/api";

// types
import type {
    AsideItemType,
    HeaderItemType,
    FieldItemType,
    LocationItemType,
    ConvertedFieldItemType,
    RowItemType,
    FilterItemType,
} from "../types/item";

// hooks
import { findChildByCurrentItem } from "../hooks/useAside";
import { buildQueryParams } from "../hooks/useObservation";

// components
import Title from "./ObservationItems/Title";
import LocationDropdown from "./ObservationItems/LocationDropdown";
import VisualizationChart from "./ObservationItems/VisualizationChart";
import FieldFilter from "./ObservationItems/FieldFilter";
import DataTable from "./ObservationItems/DataTable";

interface ObservationItemProps {
    allItem: AsideItemType[];
    currentItem: number;
}

type RowRecord = Record<string, unknown>;

const ObservationItem = ({ currentItem, allItem }: ObservationItemProps) => {
    const [rows, setRows] = useState<RowItemType[]>([]);
    const [rowCount, setRowCount] = useState<number>(0);
    const [rowCountPerPage, setRowCountPerPage] = useState<number>(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [headers, setHeaders] = useState<HeaderItemType[]>([]);
    const [fields, setFields] = useState<ConvertedFieldItemType[]>([]);
    const [locationID, setLocationID] = useState<string>("SM");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [filters, setFilters] = useState<Record<string, FilterItemType>>({});
    const [locations, setLocations] = useState<LocationItemType[]>([]);
    const scrollTargetRef = useRef<HTMLElement>(null);

    const entry = useMemo(
        () => findChildByCurrentItem(currentItem, allItem),
        [currentItem, allItem]
    );

    // 1) 取欄位定義（只依賴 entry）
    useEffect(() => {
        if (!entry) return;

        // entry 改變先重置 meta 相依的狀態（避免殘影）
        setHeaders([]);
        setFields([]);

        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            try {
                setLoading(true);
                setError(null);

                const url = API.data.field(entry.key);
                const res = await fetch(url, { signal });
                if (!res.ok)
                    throw new Error(
                        `Meta request failed: ${res.status} ${res.statusText}`
                    );

                const metaJson: FieldItemType[] = await res.json();

                const visibleHeaders: HeaderItemType[] = (metaJson || [])
                    .filter((f) => f.show_at_table)
                    .map((f) => ({
                        key: f.field_name,
                        label:
                            f.field_name_zh_tw ||
                            f.field_name_en ||
                            f.field_name,
                        type: f.field_type!,
                    }));

                const visibleFields: ConvertedFieldItemType[] = (metaJson || [])
                    .filter((f) => f.show_at_filter)
                    .map((f) => ({
                        key: f.field_name,
                        label:
                            f.field_name_zh_tw ||
                            f.field_name_en ||
                            f.field_name,
                        type: f.field_type!,
                    }));

                if (!signal.aborted) {
                    setHeaders(visibleHeaders);
                    setFields(visibleFields);
                }
            } catch (e: any) {
                if (e?.name !== "AbortError")
                    setError(e?.message ?? "Unknown error");
            } finally {
                setLoading(false);
            }
        })();

        return () => controller.abort();
    }, [entry]);

    // 2) 取資料列（依賴 entry、分頁、filters、fields）
    useEffect(() => {
        if (!entry) return;

        // entry 或查詢條件變化，先清掉舊資料避免殘影
        setRows([]);
        setRowCount(0);
        setTotalPages(0);

        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            try {
                setLoading(true);
                setError(null);

                const query = buildQueryParams(
                    { page: currentPage, page_size: rowCountPerPage },
                    fields, // 用 meta 轉出的 fields
                    filters
                );
                const base = API.data.base(entry.key);
                const url = query ? `${base}?${query}` : base;

                const res = await fetch(url, { signal });
                if (!res.ok)
                    throw new Error(
                        `Data request failed: ${res.status} ${res.statusText}`
                    );

                const json = await res.json();
                const data = Array.isArray(json)
                    ? json
                    : Array.isArray(json?.results)
                    ? json.results
                    : Array.isArray(json?.data)
                    ? json.data
                    : [];

                if (!signal.aborted) {
                    setRows(data as RowRecord[]);
                    const count =
                        typeof json?.count === "number"
                            ? json.count
                            : data.length;
                    setRowCount(count);
                    setTotalPages(Math.ceil(count / rowCountPerPage));
                }
            } catch (e: any) {
                if (e?.name !== "AbortError")
                    setError(e?.message ?? "Unknown error");
            } finally {
                setLoading(false);
            }
        })();

        return () => controller.abort();
    }, [entry, currentPage, rowCountPerPage, filters, fields]);

    // 3) 取樣站（只依賴 entry）
    useEffect(() => {
        if (!entry) return;

        // entry 改變先清空 locations 與選取值，避免顯示舊站點
        setLocations([]);
        // 若有選取值：setLocationID("");

        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(API.data.location(entry.key), {
                    signal,
                });
                if (!res.ok)
                    throw new Error(
                        `Location request failed: ${res.status} ${res.statusText}`
                    );

                const locationJson = await res.json();
                if (!signal.aborted) {
                    setLocations(
                        Array.isArray(locationJson) ? locationJson : []
                    );
                    setLocationID(locationJson[0].location_id);
                }
            } catch (e: any) {
                if (e?.name !== "AbortError") {
                    // 只影響樣站，不影響其他資料
                    console.error(e);
                }
            } finally {
                setLoading(false);
            }
        })();

        return () => controller.abort();
    }, [entry]);

    return (
        <div className="right-infbox">
            {/* 標題區 */}
            {entry && <Title entry={entry} />}

            {/* 樣站下拉選單區 */}
            <LocationDropdown
                locations={locations}
                setLocationID={setLocationID}
            />

            {/* 圖表視覺化區 */}
            {entry && (
                <VisualizationChart
                    observationItem={entry.key}
                    locationID={locationID}
                />
            )}

            {/* 資料呈現區 */}
            <div className="data-searchbox">
                {/* 篩選 */}
                <FieldFilter
                    fields={fields}
                    setFilters={setFilters}
                    setCurrentPage={setCurrentPage}
                />

                {/* 結果 */}
                <DataTable
                    observationItem={entry?.key}
                    rowCount={rowCount}
                    rowCountPerPage={rowCountPerPage}
                    loading={loading}
                    error={error}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    rows={rows}
                    headers={headers}
                    scrollTargetRef={scrollTargetRef}
                    setCurrentPage={setCurrentPage}
                    setRowCountPerPage={setRowCountPerPage}
                />
            </div>
        </div>
    );
};

export default ObservationItem;
