import { useState, useEffect, useMemo } from "react";
import { API } from "../config/api";

// type
import type { QAType, CategoryType } from "../types/item";

// components
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";
import QAItem from "../components/QAItem";
import Spinner from "../components/Spinner";

// hooks
import { useBreadcrumb } from "../hooks/useBreadcrumb";

// helpers
import { swalToast } from "../helpers/CustomSwal";

const Faq = () => {
    const { node, trail } = useBreadcrumb();

    const [faqCategory, setFaqCategory] = useState<CategoryType[]>([]);
    const [allQA, setAllQA] = useState<QAType[]>([]);

    const [filter, setFilter] = useState<string>("all");

    const [loading, setLoading] = useState<boolean>(false);
    const [hasLoaded, setHasLoaded] = useState<boolean>(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function loadAll() {
            try {
                setLoading(true);

                const [catRes, faqRes] = await Promise.all([
                    fetch(API.faq.category, {
                        signal,
                    }),
                    fetch(API.faq.data, { signal }),
                ]);

                if (!catRes.ok)
                    throw new Error(`faq-types HTTP ${catRes.status}`);
                if (!faqRes.ok) throw new Error(`faq HTTP ${faqRes.status}`);

                const catData: CategoryType[] = await catRes.json();
                const faqJson = await faqRes.json();
                const faqData: QAType[] = Array.isArray(faqJson)
                    ? faqJson
                    : faqJson?.results ?? [];

                setFaqCategory(catData);
                setAllQA(faqData);
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    swalToast.fire({
                        icon: "error",
                        title: "獲取資料失敗，請稍後再試",
                    });
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                    setHasLoaded(true);
                }
            }
        }

        loadAll();
        return () => controller.abort();
    }, []);

    // 依分類過濾
    const filteredQA = useMemo(() => {
        if (filter === "all") return allQA;
        // 假設後端在 QA 有回 types（為 key 陣列）
        return allQA.filter(
            (qa) => Array.isArray(qa.types) && qa.types.includes(filter)
        );
    }, [allQA, filter]);

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

                <div className="contentbox">
                    <div className="main-box">
                        {/* 類型篩選 */}
                        <div className="qa-tab">
                            <ul>
                                {/* 全部 */}
                                <li
                                    className={filter === "all" ? "now" : ""}
                                    onClick={() => setFilter("all")}
                                >
                                    全部
                                </li>

                                {/* 後端回來的分類 */}
                                {faqCategory.map((category) => (
                                    <li
                                        key={category.key}
                                        className={
                                            category.key === filter ? "now" : ""
                                        }
                                        onClick={() => setFilter(category.key)}
                                    >
                                        {category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 內容區 */}
                        {loading && <Spinner />}

                        {!loading && hasLoaded && filteredQA.length === 0 && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "2rem",
                                }}
                            >
                                尚無任何常見問題
                            </div>
                        )}

                        {!loading && filteredQA.length > 0 && (
                            <QAItem data={filteredQA} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;
