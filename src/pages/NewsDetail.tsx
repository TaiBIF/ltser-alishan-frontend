import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../config/api";

// types
import type { NewsItemType } from "../types/item";

// helpers
import { swalToast } from "../helpers/CustomSwal";

// hooks
import { useBreadcrumb } from "../hooks/useBreadcrumb";

// components
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";
import Spinner from "../components/Spinner";
import ImageSwiper from "../components/ImageSwiper";

const NewsDetail = () => {
    // 找出符合 pathname 的項目 / 麵包屑
    const { node, trail } = useBreadcrumb();
    const { id } = useParams<{ id: string }>();
    const [currentNews, setCurrentNews] = useState<NewsItemType>({
        id: 0,
        title: "",
        content: "",
        date: "",
        types_display: [],
        cover_image: [],
        images: [],
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchNews = async (id: string) => {
            try {
                setLoading(true);
                const response = await fetch(API.news.detail(id), {
                    signal,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setCurrentNews(data);
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

        if (id) {
            fetchNews(id);
        }

        return () => {
            controller.abort();
        };
    }, [id]);

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

            {loading && <Spinner />}

            {/* 詳細資訊 */}
            <div className="contentbox">
                <div className="main-box">
                    <div className="news-de">
                        <div className="title-area">
                            <div className="cat-date">
                                {currentNews.types_display.map(
                                    (type, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="category e-tag"
                                            >
                                                {type}
                                            </div>
                                        );
                                    }
                                )}
                                <div className="date">{currentNews.date}</div>
                            </div>
                            <div className="news-title">
                                <h2>{currentNews.title}</h2>
                                <div className="greenline" />
                            </div>
                        </div>
                        <div className="editer">
                            <div className="flex-box">
                                <p style={{ whiteSpace: "pre-line" }}>
                                    {currentNews.content}
                                </p>
                                {currentNews.cover_image &&
                                    currentNews.cover_image[0] && (
                                        <img
                                            src={
                                                currentNews.cover_image[0].image
                                            }
                                            alt=""
                                        />
                                    )}
                            </div>
                            {currentNews.images &&
                                currentNews.images.length > 0 && (
                                    <ImageSwiper data={currentNews.images} />
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
