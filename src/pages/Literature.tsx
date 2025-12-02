import { useState, useEffect, useRef } from "react";
import { API } from "../config/api";

// types
import type { LiteraturItemType } from "../types/item";

// components
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";
import LitertureFilter from "../components/LitertureFilter";
import LiteratureResult from "../components/LiteratureResult";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";

// hooks
import { useBreadcrumb } from "../hooks/useBreadcrumb";

// helpers
import { swalToast } from "../helpers/CustomSwal";

const Literature = () => {
    const { node, trail } = useBreadcrumb();

    const [initialLiterature, setInitialLiterature] = useState<
        LiteraturItemType[]
    >([]);
    const [filteredLiterature, setFilteredLiterature] = useState<
        LiteraturItemType[]
    >([]);
    const resultRef = useRef<HTMLDivElement | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [loading, setLoading] = useState<boolean>(false);
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchLiterature = async (page: number) => {
            try {
                setLoading(true);
                const response = await fetch(API.literature.page(page), {
                    signal,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const results: LiteraturItemType[] = data.results ?? [];
                setInitialLiterature(results);
                setFilteredLiterature(results);

                if (data) {
                    setTotalPages(Math.ceil(data.count / 10));
                }
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    swalToast.fire({
                        icon: "error",
                        title: "獲取資料失敗，請稍後再試",
                    });
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false); // 結束載入
                    setHasLoaded(true); // 已載入過一次
                }
            }
        };

        fetchLiterature(currentPage);

        return () => {
            controller.abort();
        };
    }, [currentPage]);

    return (
        <div className="inherit-page">
            <div className="innbox">
                {node && (
                    <Banner
                        title={node.title_zh}
                        en={node.title_en}
                        bgImg={node.bg_img}
                    />
                )}
                <Breadcrumb trail={trail} />

                <div className="contentbox  gray-bg">
                    <div className="main-box">
                        {/* 篩選區 */}
                        <LitertureFilter
                            initialLiterature={initialLiterature}
                            onFiltered={setFilteredLiterature}
                            resultRef={resultRef}
                        />

                        {/* 結果區 */}
                        <div ref={resultRef}>
                            {/* 載入中 */}
                            {loading && <Spinner />}

                            {/* 沒資料 */}
                            {!loading &&
                                hasLoaded &&
                                filteredLiterature.length === 0 && (
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: "2rem",
                                        }}
                                    >
                                        尚無任何相關文獻
                                    </div>
                                )}

                            {/* 有資料 */}
                            {!loading && filteredLiterature.length > 0 && (
                                <LiteratureResult
                                    filteredLiterature={filteredLiterature}
                                />
                            )}
                        </div>

                        {/* 分頁 */}
                        {!loading && (
                            <Pagination
                                scrollTargetRef={resultRef}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Literature;
