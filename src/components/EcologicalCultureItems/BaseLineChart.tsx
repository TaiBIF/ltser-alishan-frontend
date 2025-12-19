import ReactECharts from "echarts-for-react";

export type LineSeries = {
    type: "line";
    name: string;
    data: (number | null)[];
};

interface BaseLineChartProps {
    title: string;
    subtitle?: string;
    xAxisData: string[];
    series: LineSeries[];
    legendPosition?: "bottom" | "right";
}

const height = 400;

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

const BaseLineChart = ({
    title,
    subtitle,
    xAxisData,
    series,
    legendPosition = "bottom",
}: BaseLineChartProps) => {
    const hasSubtitle = !!subtitle;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    // 只有桌機才真的放右邊
    const legendRightLayout = legendPosition === "right" && !isMobile;

    // ✅ 只要你指定 right，就強制 legend 用 scroll（手機也一樣）
    const legendShouldScroll = legendPosition === "right";

    const option = {
        title: {
            text: title,
            subtext: hasSubtitle ? subtitle : null,
            subtextStyle: {
                color: "#333333",
                lineHeight: 16,
            },
        },
        color: tsouColors,
        tooltip: {
            trigger: "axis",
        },
        legend: legendRightLayout
            ? {
                  type: "scroll",
                  orient: "vertical",
                  right: 10,
                  top: "middle",
              }
            : {
                  type: legendShouldScroll ? "scroll" : "plain", // ✅ 手機也會 scroll
                  orient: "horizontal",
                  left: "center",
                  bottom: isMobile ? 6 : 0,
                  itemGap: 12,
              },

        grid: legendRightLayout
            ? {
                  top: isMobile ? "18%" : "22.5%",
                  left: "12%",
                  right: "28%",
                  bottom: isMobile ? 60 : 40,
              }
            : {
                  top: isMobile ? "18%" : "22.5%",
                  left: "15%",
                  right: "10%",
                  bottom: isMobile ? 120 : 90, // 手機 + scroll legend 給多一點空間
              },
        xAxis: {
            type: "category",
            boundaryGap: true,
            data: xAxisData,
            axisLabel: {
                interval: "auto",
                rotate: isMobile ? 0 : 45,
            },
        },
        yAxis: {
            type: "value",
        },
        series,
    };

    return (
        <ReactECharts
            option={option}
            notMerge={true}
            lazyUpdate={true}
            opts={{ renderer: "canvas", height }}
            style={{ height }}
        />
    );
};

export default BaseLineChart;
