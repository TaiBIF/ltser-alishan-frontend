import { useEffect, useState, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { API } from "../../config/api";

interface SpeciesChartTypeItem {
    date: string;
    species_count: number;
}

interface TerresoundindexChartTypeItem {
    date: string;
    aci: number;
    adi: number;
    bi: number;
    ndsi: number;
}

interface WeatherChartTypeItem {
    date: string;
    air_temperature: number;
    precipitation: number;
}

interface HomeVisualizationProps {
    locationID: string;
    year: string;
    observationItems: string[];
}

type ItemKey =
    | "cameratrap"
    | "terresoundindex"
    | "birdnetsound"
    | "plantphenology"
    | "weather";

const ITEM_MAP: Record<string, ItemKey> = {
    自動照相機監測: "cameratrap",
    聲音指數: "terresoundindex",
    鳥音辨識: "birdnetsound",
    植物物候: "plantphenology",
    氣象觀測: "weather",
};

const HomeVisualization = ({
    locationID,
    year,
    observationItems,
}: HomeVisualizationProps) => {
    const [cameratrapData, setCameratrapData] = useState<
        SpeciesChartTypeItem[]
    >([]);
    const [terresoundindexData, setTerresoundindexData] = useState<
        TerresoundindexChartTypeItem[]
    >([]);
    const [birdnetsoundData, setBirdnetsoundData] = useState<
        SpeciesChartTypeItem[]
    >([]);
    const [plantphenologyData, setPlantphenologyData] = useState<
        SpeciesChartTypeItem[]
    >([]);
    const [weatherData, setWeatherData] = useState<WeatherChartTypeItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const normalizedItems = useMemo(
        () =>
            Array.isArray(observationItems)
                ? observationItems
                : String(observationItems)
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
        [observationItems]
    );

    const observationKeys = useMemo(
        () => normalizedItems.map((cn) => ITEM_MAP[cn]).filter(Boolean),
        [normalizedItems]
    );

    useEffect(() => {
        if (!locationID || !year || observationKeys.length === 0) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const query = new URLSearchParams({ locationID, year }).toString();

            // 先把沒被選到的項目清空
            if (!observationKeys.includes("cameratrap")) setCameratrapData([]);
            if (!observationKeys.includes("terresoundindex"))
                setTerresoundindexData([]);
            if (!observationKeys.includes("birdnetsound"))
                setBirdnetsoundData([]);
            if (!observationKeys.includes("plantphenology"))
                setPlantphenologyData([]);
            if (!observationKeys.includes("weather")) setWeatherData([]);

            try {
                const fetchPromises = observationKeys.map(async (key) => {
                    const endpoint = API[key].chart;
                    const res = await fetch(`${endpoint}?${query}`);

                    if (!res.ok) {
                        throw new Error(`${key} API error: ${res.status}`);
                    }

                    const data = await res.json();
                    return { key, data };
                });

                const results = await Promise.all(fetchPromises);

                for (const { key, data } of results) {
                    if (key === "cameratrap") {
                        setCameratrapData(data as SpeciesChartTypeItem[]);
                    } else if (key === "terresoundindex") {
                        setTerresoundindexData(
                            data as TerresoundindexChartTypeItem[]
                        );
                    } else if (key === "birdnetsound") {
                        setBirdnetsoundData(data as SpeciesChartTypeItem[]);
                    } else if (key === "plantphenology") {
                        setPlantphenologyData(data as SpeciesChartTypeItem[]);
                    } else if (key === "weather") {
                        setWeatherData(data as WeatherChartTypeItem[]);
                    }
                }
            } catch (e: any) {
                console.error(e);
                setError(e.message ?? "資料載入失敗");
                setCameratrapData([]);
                setTerresoundindexData([]);
                setBirdnetsoundData([]);
                setPlantphenologyData([]);
                setWeatherData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [year, locationID, observationKeys]);

    // 整合 X 軸日期
    const allDates = Array.from(
        new Set([
            ...cameratrapData.map((d) => d.date),
            ...terresoundindexData.map((d) => d.date),
            ...birdnetsoundData.map((d) => d.date),
            ...plantphenologyData.map((d) => d.date),
            ...weatherData.map((d) => d.date),
        ])
    ).sort();

    const fill = (dates: string[], map: Record<string, number | null>) =>
        dates.map((d) => map[d] ?? null);

    const round3 = (v: number | null | undefined) =>
        v == null ? null : Number(v.toFixed(3));

    const cameraSpeciesSeries = fill(
        allDates,
        Object.fromEntries(
            cameratrapData.map((d) => [d.date, d.species_count])
        ) as Record<string, number | null>
    );

    const birdSpeciesSeries = fill(
        allDates,
        Object.fromEntries(
            birdnetsoundData.map((d) => [d.date, d.species_count])
        ) as Record<string, number | null>
    );

    const plantSpeciesSeries = fill(
        allDates,
        Object.fromEntries(
            plantphenologyData.map((d) => [d.date, d.species_count])
        ) as Record<string, number | null>
    );

    // 聲音指數
    const aciSeries = fill(
        allDates,
        Object.fromEntries(
            terresoundindexData.map((d) => [d.date, Number(d.aci.toFixed(3))])
        ) as Record<string, number | null>
    );
    const adiSeries = fill(
        allDates,
        Object.fromEntries(
            terresoundindexData.map((d) => [d.date, Number(d.adi.toFixed(3))])
        ) as Record<string, number | null>
    );
    const biSeries = fill(
        allDates,
        Object.fromEntries(
            terresoundindexData.map((d) => [d.date, Number(d.bi.toFixed(3))])
        ) as Record<string, number | null>
    );
    const ndsiSeries = fill(
        allDates,
        Object.fromEntries(
            terresoundindexData.map((d) => [d.date, Number(d.ndsi.toFixed(3))])
        ) as Record<string, number | null>
    );

    // 氣象
    const tempSeries = fill(
        allDates,
        Object.fromEntries(
            weatherData.map((d) => [d.date, round3(d.air_temperature)])
        ) as Record<string, number | null>
    );
    const prepSeries = fill(
        allDates,
        Object.fromEntries(
            weatherData.map((d) => [d.date, round3(d.precipitation)])
        ) as Record<string, number | null>
    );

    const series: any[] = [];
    const yAxis: any[] = [];

    const axisIndex: {
        species?: number; // 左邊物種數
        soundMain?: number; // ACI
        soundSub?: number; // ADI/BI/NDSI
        temp?: number; // 日均溫
        rain?: number; // 降雨
    } = {};

    // 右側：聲音指數
    if (observationKeys.includes("terresoundindex")) {
        axisIndex.soundMain = yAxis.length;
        yAxis.push({
            type: "value",
            name: "ACI",
            position: "right",
            offset: 0,
        });

        axisIndex.soundSub = yAxis.length;
        yAxis.push({
            type: "value",
            name: "ADI / BI / NDSI",
            position: "right",
            offset: 60,
        });
    }

    // 右側：氣象
    if (observationKeys.includes("weather")) {
        axisIndex.temp = yAxis.length;
        yAxis.push({
            type: "value",
            name: "氣溫（℃）",
            position: "right",
            offset: 0, // 你也可以視情況調整 offset
        });

        axisIndex.rain = yAxis.length;
        yAxis.push({
            type: "value",
            name: "降水量（mm）",
            position: "right",
            offset: 60,
        });
    }

    // 左側：物種數（相機 / 鳥音 / 植物）
    if (
        observationKeys.includes("cameratrap") ||
        observationKeys.includes("birdnetsound") ||
        observationKeys.includes("plantphenology")
    ) {
        axisIndex.species = yAxis.length;
        yAxis.push({
            type: "value",
            name: "物種數",
            position: "left",
            minInterval: 1,
        });
    }

    // cameratrap
    if (
        observationKeys.includes("cameratrap") &&
        axisIndex.species !== undefined
    ) {
        series.push({
            name: "自動相機物種數",
            type: "bar",
            yAxisIndex: axisIndex.species,
            barMaxWidth: 20,
            data: cameraSpeciesSeries,
        });
    }

    // birdnetsound
    if (
        observationKeys.includes("birdnetsound") &&
        axisIndex.species !== undefined
    ) {
        series.push({
            name: "鳥音辨識物種數",
            type: "bar",
            yAxisIndex: axisIndex.species,
            barMaxWidth: 20,
            data: birdSpeciesSeries,
        });
    }

    // plantphenology
    if (
        observationKeys.includes("plantphenology") &&
        axisIndex.species !== undefined
    ) {
        series.push({
            name: "植物物候物種數",
            type: "bar",
            yAxisIndex: axisIndex.species,
            barMaxWidth: 20,
            data: plantSpeciesSeries,
        });
    }

    // terresoundindex (聲音指數)
    if (observationKeys.includes("terresoundindex")) {
        if (axisIndex.soundMain !== undefined) {
            series.push({
                name: "ACI",
                type: "line",
                yAxisIndex: axisIndex.soundMain,
                showSymbol: false,
                data: aciSeries,
            });
        }

        if (axisIndex.soundSub !== undefined) {
            series.push(
                {
                    name: "ADI",
                    type: "line",
                    yAxisIndex: axisIndex.soundSub,
                    showSymbol: false,
                    data: adiSeries,
                },
                {
                    name: "BI",
                    type: "line",
                    yAxisIndex: axisIndex.soundSub,
                    showSymbol: false,
                    data: biSeries,
                },
                {
                    name: "NDSI",
                    type: "line",
                    yAxisIndex: axisIndex.soundSub,
                    showSymbol: false,
                    data: ndsiSeries,
                }
            );
        }
    }

    // weather
    if (observationKeys.includes("weather")) {
        if (axisIndex.temp !== undefined) {
            series.push({
                name: "日平均氣溫（℃）",
                type: "line",
                yAxisIndex: axisIndex.temp,
                showSymbol: false,
                data: tempSeries,
            });
        }

        if (axisIndex.rain !== undefined) {
            series.push({
                name: "日累積降水量（mm）",
                type: "bar",
                yAxisIndex: axisIndex.rain,
                barMaxWidth: 20,
                data: prepSeries,
            });
        }
    }

    const option = {
        tooltip: {
            trigger: "axis",
        },
        legend: {
            top: 24,
        },
        grid: {
            top: 70,
            left: 60,
            right: 140,
            bottom: 60,
        },
        dataZoom: [
            { type: "slider", start: 0, end: 100, bottom: 10, height: 20 },
        ],
        xAxis: {
            type: "category",
            data: allDates,
            boundaryGap: true, // 有 bar，用 true 比較自然
            axisLabel: {
                hideOverlap: true,
            },
        },
        yAxis,
        series,
    };

    if (loading) {
        return (
            <div className="home-vis-chart">
                <div className="chart-loading">圖表載入中</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-vis-chart">
                <div className="chart-error">載入失敗：{error}</div>
            </div>
        );
    }

    return (
        <div className="home-vis-chart">
            <ReactECharts
                option={option}
                style={{ width: "100%", height: 320 }}
            />
        </div>
    );
};

export default HomeVisualization;
