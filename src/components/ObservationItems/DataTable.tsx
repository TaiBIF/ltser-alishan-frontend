// types
import type { HeaderItemType, RowItemType } from "../../types/item";
import type { DownloadMode } from "../../context/DownloadPopContext";

// hooks
import { renderCell } from "../../hooks/useObservation";

// components
import Pagination from "../Pagination";
import ArrowIcon from "../Icons/ArrowIcon";

// context
import { useAuth } from "../../context/AuthContext";
import { useDownloadPop } from "../../context/DownloadPopContext";
import { useLang } from "../../context/LangContext";
import { getObservationText } from "../../i18n/observation";

// helpers
import { swalToast } from "../../helpers/CustomSwal";

interface DataTableProps {
    observationItem: string | null | undefined;
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

const CATALOG_AVAILABLE_ITEMS = [
    "cameratrap",
    "plantphenology",
    "birdnetsound",
    "biosound",
];

const DataTable = ({
    observationItem,
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
    const { isLoggedIn } = useAuth();
    const { lang } = useLang();
    const { open: openDownloadPop } = useDownloadPop();
    const hasCatalog =
        typeof observationItem === "string" &&
        CATALOG_AVAILABLE_ITEMS.includes(observationItem);

    const handleDownloadClick = async (mode: DownloadMode) => {
        if (!isLoggedIn) {
            swalToast.fire({
                icon: "warning",
                title: getObservationText(lang, "downloadNeedLogin"),
            });
            return;
        }

        if (typeof observationItem !== "string") {
            swalToast.fire({
                icon: "error",
                title: getObservationText(lang, "downloadInvalidItem"),
            });
            return;
        }

        openDownloadPop({
            locationID: "",
            locationName: "",
            year: "",
            items: [observationItem],
            mode: mode,
        });
    };

    return (
        <div className="result-area">
            <div className="toptool">
                <div className="d-flex flex-column">
                    <div className="data-num">
                        {getObservationText(lang, "rowCount")}：{rowCount}
                    </div>
                    <div className="c-select c-select--light c-form__set c-form__set--row">
                        <label
                            htmlFor="site"
                            className="c-select__label c-form__label mb-0"
                        >
                            {getObservationText(lang, "perPage")}
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
                                    {getObservationText(lang, "selectRowCount")}
                                </option>
                                {[10, 30, 50, 100].map((v: number) => {
                                    return (
                                        <option key={v} value={v}>
                                            {v} {getObservationText(lang, "rowUnit")}
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

                {/* 下載按鈕 */}
                <div className="btnr-box">
                    <button
                        type="button"
                        className="dowapply"
                        onClick={() => handleDownloadClick("item_all")}
                    >
                        {getObservationText(lang, "downloadObservationData")}
                    </button>
                    {hasCatalog && (
                        <button
                            type="button"
                            onClick={() => handleDownloadClick("catalog")}
                        >
                            {getObservationText(lang, "downloadCatalog")}
                        </button>
                    )}
                </div>
            </div>
            <div className="ovhbox" style={{ overflowX: "scroll" }}>
                {loading && <div>{getObservationText(lang, "observationLoading")}</div>}
                {error && <div>{getObservationText(lang, "observationError")}</div>}

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
                    <div>{getObservationText(lang, "observationNoData")}</div>
                )}
            </div>

            {!loading && !error && rows.length > 0 && headers.length > 0 && (
                <Pagination
                    scrollTargetRef={scrollTargetRef}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    prevText={getObservationText(lang, "paginationPrev")}
                    nextText={getObservationText(lang, "paginationNext")}
                />
            )}
        </div>
    );
};

export default DataTable;
