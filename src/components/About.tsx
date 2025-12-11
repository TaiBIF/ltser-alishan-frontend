import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../config/api";

// types
import type { AboutItemType, AboutApiItemType } from "../types/item";

// helpers
import { swalToast } from "../helpers/CustomSwal";

// hooks
import { usePageTitle } from "../hooks/usePageTitle";

const typeMap: Record<string, string> = {
    ecology: "生態觀測",
    environment: "環境觀測",
    "ecological-economics": "生態經濟",
    "ecological-culture": "經濟與文化面向",
};

const About = () => {
    const { path } = useParams<{ path: string }>();
    usePageTitle("關於LTSER 阿里山");
    const navigate = useNavigate();
    const [currentAbout, setCurrentAbout] = useState<AboutItemType | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const getCurrentAbout = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(API.introduction.all, { signal });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data: AboutApiItemType[] = await res.json();

                const matched =
                    data.find((item) => item.name_en === path) || null;

                if (!signal.aborted) {
                    if (!matched) {
                        setCurrentAbout(null);
                        setError("找不到對應的介紹內容");
                        await swalToast.fire({
                            icon: "warning",
                            title: "找不到該頁面，將返回首頁",
                        });
                        if (!signal.aborted) {
                            navigate("/", { replace: true });
                        }
                    } else {
                        const mappedAbout: AboutItemType = {
                            type_zh: typeMap[matched.type] ?? "",
                            id: matched.id,
                            path: matched.name_en,
                            title: matched.name,
                            content: matched.content,
                            bg_img: matched.media_url,
                        };
                        setCurrentAbout(mappedAbout);
                    }
                }
            } catch (e: any) {
                if (e.name === "AbortError") return;
                setError(e?.message ?? "載入失敗");
                swalToast.fire({
                    icon: "error",
                    title: "伺服器發生錯誤，請聯繫網站管理員",
                });
            } finally {
                if (!signal.aborted) setLoading(false);
            }
        };

        if (path) getCurrentAbout();

        return () => {
            controller.abort();
        };
    }, [path]);

    if (!currentAbout) return null;
    if (loading) return null;
    if (error && !currentAbout) return null;

    const { type_zh, title, content, bg_img } = currentAbout;

    return (
        <div className="innbox">
            <div className="contentbox">
                <div className="main-box">
                    <div className="about-mainbox">
                        <div className="leftbox">
                            <div className="title-area">
                                {type_zh && (
                                    <div className="ab-category">{type_zh}</div>
                                )}
                                {title && <h2>{title}</h2>}
                            </div>
                            {content && (
                                <p style={{ whiteSpace: "pre-line" }}>
                                    {content}
                                </p>
                            )}
                        </div>

                        {bg_img && (
                            <div className="rightbox">
                                <div className="pic-area">
                                    <div
                                        className="img-area"
                                        style={{
                                            backgroundImage: `url(${bg_img})`,
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
