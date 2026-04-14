import { useState, useEffect, useRef } from "react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import { useLang } from "../../context/LangContext";
import { getObservationText } from "../../i18n/observation";

// data
import villageJson from "../../data/villageGeojson.json";

const height = 600;

const tsouColors = [
    "#D7544F", // 鄒族儀式紅（亮度提高，黑字可讀）
    "#E3C6A8", // 竹藤米色（服飾、竹製器具）
    "#C28F6A", // 陶土橘（陶器、傳統建物）
    "#B7C9E2", // 霧藍（阿里山晨霧）
    "#A4B494", // 山林霧綠（阿里山意象）
    "#F2D4AE", // 乾燥米白（雕刻、服飾底色）
    "#C39B7F", // 木雕棕（鄒族工藝）
    "#D1B3C4", // 羽飾淡紫（文化裝飾常用）
    "#A8C3BC", // 青灰綠（山嵐色）
    "#E7A977", // 赭黃（陽光儀式感）
];

// 在元件外面先註冊一次地圖（避免每次 render 重複註冊）
echarts.registerMap("subVillage", villageJson as any);

interface AreaMapProps {
    populationByVillName: Record<string, number>;
}

const AreaMap = ({ populationByVillName }: AreaMapProps) => {
    const { lang } = useLang();
    // 從 GeoJSON 抓所有村名
    const villageList =
        villageJson.features?.map((f: any) => f.properties.VILLNAME) ?? [];

    const seriesData = villageList.map((name: string, idx: number) => ({
        name,
        value: idx + 1,
        population: populationByVillName[name] ?? 0,
    }));

    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(600);

    const option = {
        title: {
            subtext:
                getObservationText(lang, "areaMapSubtext"),
            subtextStyle: {
                color: "#333333",
                lineHeight: 16,
            },
        },
        tooltip: {
            trigger: "item",
            formatter: (params: any) => {
                const village = params.name;
                const population = params.data?.population ?? 0;

                // 顯示：村名 + 人口數
                return `
                    <div>
                        <strong>${village}</strong><br/>
                        ${getObservationText(
                            lang,
                            "populationCountLabel",
                        )}：${population.toLocaleString()} ${getObservationText(
                            lang,
                            "peopleUnit",
                        )}
                    </div>
                `;
            },
        },

        visualMap: {
            type: "piecewise",
            show: false, // 不顯示 legend（想顯示可改 true）
            pieces: villageList.map((name: string, idx: number) => ({
                value: idx + 1,
                label: name,
                color: tsouColors[idx % tsouColors.length],
            })),
        },

        series: [
            {
                type: "map",
                map: "subVillage",
                nameProperty: "VILLNAME",
                aspectScale: 0.9,
                label: { show: true, fontSize: 10 },
                itemStyle: {
                    borderColor: "#777",
                    borderWidth: 1,
                },
                data: seriesData,
            },
        ],
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width;

            // 👇 地圖比例（可調）
            const calculatedHeight = Math.max(360, width * 0.75);
            setHeight(calculatedHeight);
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} style={{ width: "100%" }}>
            <ReactECharts
                option={option}
                notMerge={true}
                lazyUpdate={true}
                style={{ height }}
                opts={{ renderer: "canvas" }}
            />
        </div>
    );
};

export default AreaMap;
