import { useState, useEffect, useRef } from "react";
import { API } from "../config/api";

// types
import type { NewsItemType } from "../types/item";

// components
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";
import NewsFilter from "../components/NewItems/NewsFilter";
import NewsResult from "../components/NewItems/NewsResult";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";

// hooks
import { useBreadcrumb } from "../hooks/useBreadcrumb";

// helpers
import { swalToast } from "../helpers/CustomSwal";

const News = () => {
    // 找出符合 pathname 的項目 / 麵包屑
    const { node, trail } = useBreadcrumb();

    const [initialNews, setInitialNews] = useState<NewsItemType[]>([]);
    const [filteredNews, setFilteredNews] = useState<NewsItemType[]>([]);
    const resultRef = useRef<HTMLDivElement | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [loading, setLoading] = useState<boolean>(false);
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchNews = async (page: number) => {
            try {
                setLoading(true);
                const response = await fetch(API.news.page(page), {
                    signal,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const results: NewsItemType[] = data.results ?? [];
                setInitialNews(results);
                setFilteredNews(results);

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

        fetchNews(currentPage);

        return () => {
            controller.abort();
        };
    }, [currentPage]);

    return (
        <div className="inherit-page">
            {node && (
                <Banner
                    title={node.title_zh}
                    en={node.title_en}
                    bgImg={node.bg_img}
                />
            )}
            <Breadcrumb trail={trail} />

            <div className="contentbox gray-bg">
                <div className="main-box">
                    {/* 篩選區 */}
                    <NewsFilter
                        initialNews={initialNews}
                        onFiltered={setFilteredNews}
                        resultRef={resultRef}
                    />

                    {/* 結果區 */}
                    <div ref={resultRef}>
                        {/* 載入中 */}
                        {loading && <Spinner />}

                        {/* 沒資料 */}
                        {!loading && hasLoaded && filteredNews.length === 0 && (
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
                        {!loading && filteredNews.length > 0 && (
                            <NewsResult filteredNews={filteredNews} />
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
    );
};

export default News;
