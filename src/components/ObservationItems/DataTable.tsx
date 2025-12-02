// types
import type { HeaderItemType, RowItemType } from "../../types/item";

// hooks
import { renderCell } from "../../hooks/useObservation";

// components
import Pagination from "../Pagination";
import ArrowIcon from "../Icons/ArrowIcon";

interface DataTableProps {
    rowCount: number;
    rowCountPerPage: number;
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    rows: RowItemType[];
    headers: HeaderItemType[];
    scrollTargetRef: React.RefObject<HTMLElement | null>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setRowCountPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const DataTable = ({
    rowCount,
    rowCountPerPage,
    loading,
    error,
    currentPage,
    totalPages,
    rows,
    headers,
    scrollTargetRef,
    setCurrentPage,
    setRowCountPerPage,
}: DataTableProps) => {
    return (
        <div className="result-area">
            <div className="toptool">
                <div className="d-flex flex-column">
                    <div className="data-num">資料筆數：{rowCount}</div>
                    <div className="c-select c-select--light c-form__set c-form__set--row">
                        <label
                            htmlFor="site"
                            className="c-select__label c-form__label mb-0"
                        >
                            一頁
                        </label>
                        <div className="c-select__wrapper">
                            <select
                                id="site"
                                name="site"
                                className="c-select__select"
                                value={rowCountPerPage}
                                onChange={(e) => {
                                    setRowCountPerPage(Number(e.target.value));
                                }}
                            >
                                <option value="" disabled>
                                    請選擇筆數
                                </option>
                                {[10, 30, 50, 100].map((v: number) => {
                                    return (
                                        <option key={v} value={v}>
                                            {v} 筆
                                        </option>
                                    );
                                })}
                            </select>
                            <label htmlFor="site" className="c-select__arrow">
                                <ArrowIcon />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ovhbox" style={{ overflowX: "scroll" }}>
                {loading && <div>觀測資料載入中</div>}
                {error && <div>觀測資料載入發生錯誤</div>}

                {!loading &&
                    !error &&
                    rows.length > 0 &&
                    headers.length > 0 && (
                        <table
                            border={0}
                            cellSpacing={0}
                            cellPadding={0}
                            className="table-style1"
                        >
                            <thead>
                                <tr className="text-nowrap">
                                    {headers.map((h) => (
                                        <th
                                            key={h.key}
                                            style={{
                                                padding: "8px",
                                                fontWeight: "normal",
                                                fontSize: 16,
                                            }}
                                        >
                                            {h.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, rIdx) => (
                                    <tr key={rIdx}>
                                        {headers.map((h) => (
                                            <td
                                                key={h.key}
                                                style={{
                                                    padding: "8px",
                                                }}
                                            >
                                                {renderCell(
                                                    (row as any)[h.key]
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                {!loading && !error && rows.length === 0 && (
                    <div>目前沒有資料</div>
                )}
            </div>

            {!loading && !error && rows.length > 0 && headers.length > 0 && (
                <Pagination
                    scrollTargetRef={scrollTargetRef}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    );
};

export default DataTable;
