import { useState, useEffect } from "react";
import { API } from "../../config/api";

// components
import IndustryLineChart from "./IndustryLineChart";

// data
import { industryThemeList } from "../../data/villagePopulationTheme";

// types
import type { ThemeItem } from "../../data/villagePopulationTheme";

type IndustryPayload = {
    years: number[];
    charts: Record<
        string,
        {
            title?: string;
            series: { key?: string; name: string; data: (number | null)[] }[];
        }
    >;
};

const IndustryStructure = () => {
    const [loading, setLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [payload, setPayload] = useState<IndustryPayload | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            try {
                setLoading(true);
                const res = await fetch(API.town.industry, { signal });
                if (!res.ok) throw new Error(`industry HTTP ${res.status}`);

                const json: IndustryPayload = await res.json();
                setPayload(json);
            } catch (err: any) {
                if (err.name !== "AbortError") console.error(err);
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                    setHasLoaded(true);
                }
            }
        })();

        return () => controller.abort();
    }, []);

    return (
        <>
            <div className="infbox-title">
                <div className="titlearea">
                    <h2>
                        產業結構
                        <div className="mark-cir">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                viewBox="0 0 18 18"
                            >
                                <g
                                    id="Ellipse_2931"
                                    data-name="Ellipse 2931"
                                    fill="none"
                                    stroke="#e8d06a"
                                    strokeWidth={4}
                                >
                                    <circle cx={9} cy={9} r={9} stroke="none" />
                                    <circle cx={9} cy={9} r={7} fill="none" />
                                </g>
                            </svg>
                        </div>
                    </h2>
                    <div className="line" />
                </div>
            </div>

            <section className="u-section">
                <div className="town-industry-line-chart">
                    {loading && !hasLoaded ? (
                        <div style={{ padding: 12 }}>載入中…</div>
                    ) : payload ? (
                        industryThemeList.map((theme: ThemeItem, i) => (
                            <IndustryLineChart
                                key={i}
                                theme={theme}
                                payload={payload}
                            />
                        ))
                    ) : (
                        <div style={{ padding: 12 }}>尚無資料</div>
                    )}
                </div>
            </section>

            <section className="u-section">
                <div className="population-data-source">
                    資料來源：SEGIS 社會經濟資料服務平台
                </div>
            </section>
        </>
    );
};

export default IndustryStructure;
