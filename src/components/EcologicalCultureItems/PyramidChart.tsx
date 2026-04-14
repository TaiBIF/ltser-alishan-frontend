import ReactECharts from "echarts-for-react";
import { useLang } from "../../context/LangContext";
import { getObservationText } from "../../i18n/observation";

interface PyramidChartProps {
    xAxis: string[]; // 年齡階層，例如 ['0-4歲', '5-9歲', ...]
    male: number[]; // 對應每個年齡階層的男性人數
    female: number[]; // 對應每個年齡階層的女性人數
}

const PyramidChart = ({ xAxis, male, female }: PyramidChartProps) => {
    const { lang } = useLang();
    const height = 600;

    const option = {
        color: ["#6FA6C4", "#D36A5C"],
        title: {
            subtext:
                getObservationText(lang, "pyramidSubtext"),
            subtextStyle: {
                color: "#333333",
                lineHeight: 16,
            },
        },
        tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
        },
        grid: [
            {
                right: "10%",
                top: "10%",
                height: "80%",
                width: "35%",
            },
            {
                left: "10%",
                top: "10%",
                height: "80%",
                width: "35%",
            },
        ],
        legend: {
            bottom: 0,
        },
        yAxis: [
            {
                type: "category",
                boundaryGap: true,
                data: xAxis,
                show: false,
            },
            {
                gridIndex: 1,
                type: "category",
                boundaryGap: true,
                data: xAxis,
                position: "right",
            },
        ],
        xAxis: [
            {
                name: getObservationText(lang, "femalePeople"),
                type: "value",
            },
            {
                gridIndex: 1,
                name: getObservationText(lang, "malePeople"),
                type: "value",
                inverse: true,
            },
        ],
        series: [
            {
                name: getObservationText(lang, "male"),
                type: "bar",
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: male,
            },
            {
                name: getObservationText(lang, "female"),
                type: "bar",
                data: female,
            },
        ],
    };

    return <ReactECharts option={option} style={{ height }} />;
};

export default PyramidChart;
