import { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { API } from "../../config/api";

type SpeciesPoint = {
    date: string;
    species_count: number;
};

type AcousticPoint = {
    date: string;
    aci: number;
    adi: number;
    bi: number;
    ndsi: number;
};

type WeatherPoint = {
    date: string;
    air_temperature: number | null;
    precipitation: number | null;
};

type ChartPoint = SpeciesPoint | AcousticPoint | WeatherPoint;

type ChartType = "species" | "acoustic" | "weather" | "unknown";

interface VisualizationChartProps {
    observationItem: string | null | undefined;
    locationID: string;
    height?: number | string;
}

const isSpeciesPoint = (item: any): item is SpeciesPoint =>
    item && typeof item === "object" && "species_count" in item;

const isAcousticPoint = (item: any): item is AcousticPoint =>
    item &&
    typeof item === "object" &&
    "aci" in item &&
    "adi" in item &&
    "bi" in item &&
    "ndsi" in item;

const isWeatherPoint = (item: any): item is WeatherPoint =>
    item &&
    typeof item === "object" &&
    "air_temperature" in item &&
    "precipitation" in item;

const VisualizationChart = ({
    observationItem,
    locationID,
    height = 360,
}: VisualizationChartProps) => {
    const [data, setData] = useState<ChartPoint[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!observationItem || !locationID) {
            return;
        }

        const controller = new AbortController();
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    API.data.chart(observationItem, locationID),
                    { signal: controller.signal }
                );
                if (!res.ok) {
                    throw new Error(
                        `Request failed: ${res.status} ${res.statusText}`
                    );
                }
                const json = (await res.json()) as ChartPoint[];
                setData(json);
            } catch (e: any) {
                if (e?.name !== "AbortError")
                    setError(e?.message ?? "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        return () => controller.abort();
    }, [observationItem, locationID]);

    /**
     * 這裡負責：
     * 1. 判斷 chartType
     * 2. 把資料整理成 dates / series / yAxis / tooltipFormatter
     */
    const { dates, series, yAxis, chartType } = useMemo(() => {
        if (!data.length) {
            return {
                dates: [] as string[],
                series: [] as any[],
                yAxis: [],
                chartType: "unknown" as ChartType,
            };
        }

        const sortedData = [...data].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        const dates = sortedData.map((item) => item.date);

        const first = sortedData[0];

        // 1) 物種數
        if (isSpeciesPoint(first)) {
            const values = sortedData.map((item) =>
                isSpeciesPoint(item) ? item.species_count ?? 0 : 0
            );

            return {
                dates,
                chartType: "species" as ChartType,
                series: [
                    {
                        name: "物種數",
                        type: "line",
                        smooth: false,
                        showSymbol: true,
                        sampling: "lttb",
                        data: values,
                    },
                ],
                yAxis: {
                    type: "value",
                    name: "物種數",
                    minInterval: 1,
                },
            };
        }

        // 2) 聲音指數
        if (isAcousticPoint(first)) {
            const aci = sortedData.map((item) =>
                isAcousticPoint(item) ? item.aci ?? 0 : 0
            );
            const adi = sortedData.map((item) =>
                isAcousticPoint(item) ? item.adi ?? 0 : 0
            );
            const bi = sortedData.map((item) =>
                isAcousticPoint(item) ? item.bi ?? 0 : 0
            );
            const ndsi = sortedData.map((item) =>
                isAcousticPoint(item) ? item.ndsi ?? 0 : 0
            );

            return {
                dates,
                chartType: "acoustic" as ChartType,
                series: [
                    {
                        name: "日平均聲音複雜度（ACI）",
                        type: "line",
                        showSymbol: true,
                        sampling: "lttb",
                        data: aci,
                        yAxisIndex: 0,
                    },
                    {
                        name: "日平均聲音多樣性指數（ADI）",
                        type: "line",
                        showSymbol: true,
                        sampling: "lttb",
                        data: adi,
                        yAxisIndex: 1,
                    },
                    {
                        name: "日平均聲音指數（BI）",
                        type: "line",
                        showSymbol: true,
                        sampling: "lttb",
                        data: bi,
                        yAxisIndex: 1,
                    },
                    {
                        name: "日平均標準化聲景指數（NDSI）",
                        type: "line",
                        showSymbol: true,
                        sampling: "lttb",
                        data: ndsi,
                        yAxisIndex: 1,
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "ACI",
                        position: "left",
                    },
                    {
                        type: "value",
                        name: "ADI / BI / NDSI",
                        position: "right",
                    },
                ],
            };
        }

        // 3) 氣象：氣溫 + 降水量
        if (isWeatherPoint(first)) {
            const airTemp = sortedData.map((item) =>
                isWeatherPoint(item) && item.air_temperature != null
                    ? item.air_temperature
                    : null
            );
            const precip = sortedData.map((item) =>
                isWeatherPoint(item) && item.precipitation != null
                    ? item.precipitation
                    : null
            );

            return {
                dates,
                chartType: "weather" as ChartType,
                series: [
                    {
                        name: "日平均氣溫（°C）",
                        type: "line",
                        showSymbol: true,
                        sampling: "lttb",
                        data: airTemp,
                        yAxisIndex: 0,
                    },
                    {
                        name: "日累積降水量（mm）",
                        type: "bar", // 這個你可以改 line
                        data: precip,
                        yAxisIndex: 1,
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "氣溫（°C）",
                        position: "left",
                    },
                    {
                        type: "value",
                        name: "降水量（mm）",
                        position: "right",
                    },
                ],
            };
        }

        // fallback：資料格式不認得
        return {
            dates: [] as string[],
            series: [] as any[],
            yAxis: [],
            chartType: "unknown" as ChartType,
        };
    }, [data]);

    // 根據 chartType 統一產生 tooltip
    const option = useMemo(() => {
        const tooltipFormatter = (params: any) => {
            const list = Array.isArray(params) ? params : [params];
            const dateStr = list[0]?.axisValue ?? "";

            if (chartType === "species") {
                const p = list[0];
                return `${dateStr}<br/>物種數：${p.data}`;
            }

            if (chartType === "acoustic") {
                const lines = list
                    .map(
                        (p: any) =>
                            `${p.seriesName}: ${
                                typeof p.data === "number"
                                    ? p.data.toFixed(3)
                                    : p.data
                            }`
                    )
                    .join("<br/>");
                return `${dateStr}<br/>${lines}`;
            }

            if (chartType === "weather") {
                const lines = list
                    .map((p: any) => {
                        if (p.seriesName.includes("氣溫")) {
                            return `${p.seriesName}: ${
                                p.data == null ? "-" : `${p.data.toFixed(1)} °C`
                            }`;
                        }
                        if (p.seriesName.includes("降水量")) {
                            return `${p.seriesName}: ${
                                p.data == null ? "-" : `${p.data.toFixed(1)} mm`
                            }`;
                        }
                        return `${p.seriesName}: ${p.data ?? "-"}`;
                    })
                    .join("<br/>");
                return `${dateStr}<br/>${lines}`;
            }

            // unknown
            const lines = list
                .map((p: any) => `${p.seriesName}: ${p.data}`)
                .join("<br/>");
            return `${dateStr}<br/>${lines}`;
        };

        return {
            tooltip: {
                trigger: "axis",
                formatter: tooltipFormatter,
            },
            grid: { left: 50, right: 50, top: 40, bottom: 100 },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: dates,
                axisLabel: {
                    hideOverlap: true,
                },
            },
            yAxis,
            series,
            legend: {
                bottom: 50,
            },
            dataZoom: [
                { type: "slider", start: 0, end: 100, bottom: 10, height: 20 },
            ],
        };
    }, [dates, series, yAxis, chartType, locationID]);

    if (!locationID) {
        return <div>請選擇樣站</div>;
    }
    if (!observationItem) {
        return <div>沒有該觀測項目</div>;
    }
    if (loading) {
        return <div>圖表資料載入中</div>;
    }
    if (error) {
        return <div>獲取圖表資料發生錯誤：{error}</div>;
    }
    if (!data.length) {
        return <div>沒有可用資料</div>;
    }

    return <ReactECharts option={option} style={{ height }} notMerge={true} />;
};

export default VisualizationChart;
