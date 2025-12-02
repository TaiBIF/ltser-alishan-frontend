import { useState, useEffect, useRef } from "react";
import { API } from "../config/api";

// types
import type { EventItemType } from "../types/item";

// components
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";
import CoutEventFilter from "../components/CouEventItems/CoutEventFilter";
import CouEventResult from "../components/CouEventItems/CouEventResult";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";

// hooks
import { useBreadcrumb } from "../hooks/useBreadcrumb";

// helpers
import { swalToast } from "../helpers/CustomSwal";

const CouEvent = () => {
    // 找出符合 pathname 的項目 / 麵包屑
    const { node, trail } = useBreadcrumb();
    const [initialEvent, setInitialEvent] = useState<EventItemType[]>([]);
    const [filteredEvent, setFilteredEvent] = useState<EventItemType[]>([]);
    const resultRef = useRef<HTMLDivElement | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [loading, setLoading] = useState<boolean>(false);
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchEvents = async (page: number) => {
            try {
                setLoading(true);
                const response = await fetch(API.cou.page(page), {
                    signal,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const results: EventItemType[] = data.results ?? [];
                setInitialEvent(results);
                setFilteredEvent(results);

                if (data) {
                    setTotalPages(Math.ceil(data.count / 10));
                }
            } catch (err: any) {
                if (err.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
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

        fetchEvents(currentPage);

        return () => {
            controller.abort();
        };
    }, [currentPage]);

    return (
        <>
            <div className="inherit-page">
                {node && (
                    <Banner
                        title={node.title_zh}
                        en={node.title_en}
                        bgImg={node.bg_img}
                    />
                )}
                <Breadcrumb trail={trail} />
            </div>
            <div className="contentbox gray-bg">
                <div className="main-box">
                    {/* 篩選區 */}
                    <CoutEventFilter
                        initialEvent={initialEvent}
                        onFiltered={setFilteredEvent}
                        resultRef={resultRef}
                    />

                    {/* 結果區 */}

                    <div ref={resultRef}>
                        {/* 載入中 */}
                        {loading && <Spinner />}

                        {/* 沒資料 */}
                        {!loading &&
                            hasLoaded &&
                            filteredEvent.length === 0 && (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "2rem",
                                    }}
                                >
                                    尚無任何最新消息
                                </div>
                            )}

                        {/* 有資料 */}
                        {!loading && filteredEvent.length > 0 && (
                            <CouEventResult filteredEvent={filteredEvent} />
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
        </>
    );
};

export default CouEvent;
