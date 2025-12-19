import { useState, useEffect, useMemo } from "react";
import { API } from "../../config/api";

// components
import ArrowIcon from "../../components/Icons/ArrowIcon";
import AreaMap from "./AreaMap";
import PyramidChart from "./PyramidChart";
import PopulationLineChart from "./PopulationLineChart";

// data
import { populaitonThemeList } from "../../data/villagePopulationTheme";

// 1) 地圖用 payload
type MapPayload = {
    years: (number | string)[]; // 後端若回 number 就是 number[]；先兼容
    data_by_year: Record<string, Record<string, number>>; // year -> {村名: 人口}
};

// 2) 折線圖用 payload
type LinesPayload = {
    years: number[];
    metrics: Record<
        string,
        {
            label: string;
            series: Record<string, (number | null)[]>;
        }
    >;
};

type PyramidPayload = {
    years: number[];
    selected_year: number | null;
    chart: { xAxis: string[]; male: number[]; female: number[] };
};

const PopluationStructure = () => {
    const [mapLoading, setMapLoading] = useState(false);
    const [pyramidLoading, setPyramidLoading] = useState(false);
    const [linesLoading, setLinesLoading] = useState(false);

    const [mapPayload, setMapPayload] = useState<MapPayload | null>(null);
    const [pyramidPayload, setPyramidPayload] = useState<PyramidPayload | null>(
        null
    );
    const [linesPayload, setLinesPayload] = useState<LinesPayload | null>(null);

    const [mapYear, setMapYear] = useState<number | "">("");
    const [pyramidYear, setPyramidYear] = useState<number | "">("");

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function loadAll() {
            setMapLoading(true);
            setLinesLoading(true);
            setPyramidLoading(true);

            const [mapRes, linesRes, pyramidRes] = await Promise.allSettled([
                fetch(API.village.population, { signal }),
                fetch(API.village.dynamics, { signal }),
                fetch(API.town.pyramid, { signal }),
            ]);

            // map
            try {
                if (mapRes.status === "fulfilled") {
                    const res = mapRes.value;
                    if (!res.ok)
                        throw new Error(`population HTTP ${res.status}`);
                    const mapJson: MapPayload = await res.json();
                    setMapPayload(mapJson);

                    const last = mapJson.years?.[mapJson.years.length - 1];
                    const defaultYear = last == null ? "" : Number(last);
                    setMapYear(Number.isFinite(defaultYear) ? defaultYear : "");
                }
            } catch (e) {
                console.error(e);
                setMapPayload(null);
            } finally {
                if (!signal.aborted) setMapLoading(false);
            }

            // lines
            try {
                if (linesRes.status === "fulfilled") {
                    const res = linesRes.value;
                    if (!res.ok) throw new Error(`lines HTTP ${res.status}`);
                    const linesJson: LinesPayload = await res.json();
                    setLinesPayload(linesJson);
                }
            } catch (e) {
                console.error(e);
                setLinesPayload(null);
            } finally {
                if (!signal.aborted) setLinesLoading(false);
            }

            // pyramid
            try {
                if (pyramidRes.status === "fulfilled") {
                    const res = pyramidRes.value;
                    if (!res.ok) throw new Error(`pyramid HTTP ${res.status}`);
                    const pyramidJson: PyramidPayload = await res.json();
                    setPyramidPayload(pyramidJson);

                    const defaultPyramidYear =
                        pyramidJson.selected_year ??
                        pyramidJson.years?.[pyramidJson.years.length - 1] ??
                        "";
                    setPyramidYear(defaultPyramidYear);
                }
            } catch (e) {
                console.error(e);
                setPyramidPayload(null);
            } finally {
                if (!signal.aborted) setPyramidLoading(false);
            }
        }

        loadAll();
        return () => controller.abort();
    }, []);

    // 地圖年份選單
    const yearOptions = (mapPayload?.years ?? [])
        .map((y) => Number(y))
        .filter((y) => Number.isFinite(y));

    const populationByVillName = useMemo(() => {
        if (!mapPayload || !mapYear) return {};
        return mapPayload.data_by_year?.[String(mapYear)] ?? {};
    }, [mapPayload, mapYear]);

    const pyramidYearOptions = pyramidPayload?.years ?? [];

    return (
        <>
            <div className="infbox-title">
                <div className="titlearea">
                    <h2>
                        人口結構
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

            {/* 人口概況 */}
            <section className="u-section">
                <h2 className="c-subtitle">人口概況</h2>
                <div className="c-select c-form__set c-select__flex-container">
                    <div>
                        <label
                            htmlFor="site"
                            className="c-select__label c-form__label"
                        >
                            請選擇年份
                        </label>
                        <div className="c-select__wrapper">
                            <select
                                id="year"
                                className="c-select__select"
                                value={mapYear}
                                onChange={(e) =>
                                    setMapYear(Number(e.target.value))
                                }
                                disabled={mapLoading || !mapPayload}
                            >
                                <option value="" disabled>
                                    請選擇年份
                                </option>

                                {yearOptions.map((y) => (
                                    <option key={y} value={y}>
                                        {y}年
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="year" className="c-select__arrow">
                                <ArrowIcon />
                            </label>
                        </div>
                    </div>
                </div>
                {mapLoading ? (
                    <div style={{ padding: 12 }}>資料載入中</div>
                ) : (
                    <AreaMap populationByVillName={populationByVillName} />
                )}
            </section>

            {/* 人口金字塔 */}
            <section className="u-section">
                <h2 className="c-subtitle">人口金字塔</h2>
                <div className="c-select c-form__set c-select__flex-container">
                    <div>
                        <label
                            htmlFor="site"
                            className="c-select__label c-form__label"
                        >
                            請選擇年份
                        </label>
                        <div className="c-select__wrapper">
                            <select
                                id="pyramidYear"
                                className="c-select__select"
                                value={pyramidYear}
                                onChange={async (e) => {
                                    const y = Number(e.target.value);
                                    setPyramidYear(y);

                                    try {
                                        const res = await fetch(
                                            `${API.town.pyramid}?year=${y}`
                                        );
                                        if (!res.ok)
                                            throw new Error(
                                                `pyramid HTTP ${res.status}`
                                            );
                                        const json: PyramidPayload =
                                            await res.json();
                                        setPyramidPayload(json);
                                    } catch (err) {
                                        console.error(err);
                                    }
                                }}
                                disabled={pyramidLoading || !pyramidPayload}
                            >
                                <option value="" disabled>
                                    請選擇年份
                                </option>

                                {pyramidYearOptions.map((y) => (
                                    <option key={y} value={y}>
                                        {y}年
                                    </option>
                                ))}
                            </select>

                            <label
                                htmlFor="pyramidYear"
                                className="c-select__arrow"
                            >
                                <ArrowIcon />
                            </label>
                        </div>
                    </div>
                </div>
                {pyramidLoading ? (
                    <div style={{ padding: 12 }}>資料載入中</div>
                ) : pyramidPayload?.chart?.xAxis?.length ? (
                    <PyramidChart
                        xAxis={pyramidPayload.chart.xAxis}
                        male={pyramidPayload.chart.male}
                        female={pyramidPayload.chart.female}
                    />
                ) : (
                    <div style={{ padding: 12 }}>尚無資料</div>
                )}
            </section>

            {/* 人口變遷 */}
            <section className="u-section">
                <h2 className="c-subtitle">人口變遷</h2>

                <div className="village-population-line-chart">
                    {linesLoading ? (
                        <div style={{ padding: 12 }}>資料載入中</div>
                    ) : (
                        linesPayload &&
                        populaitonThemeList.map((o, i) => (
                            <PopulationLineChart
                                key={i}
                                theme={o}
                                payload={linesPayload}
                            />
                        ))
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

export default PopluationStructure;
