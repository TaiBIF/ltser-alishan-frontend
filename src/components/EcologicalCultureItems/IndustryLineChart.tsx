import BaseLineChart from "./BaseLineChart";
import type { LineSeries } from "./BaseLineChart";

export type ThemeItem = {
    title: string;
    subtitle: string;
};

// 產業類別
const industryCategories = [
    "農業",
    "服務業",
    "觀光業",
    "製造業",
    "文化創意產業",
];

// x 軸
const xAxisData = ["2018年", "2019年", "2020年", "2021年", "2022年"];

// 產生各產業的假資料
const makeIndustrySeries = (): LineSeries[] =>
    industryCategories.map((name, idx) => ({
        type: "line",
        name,
        data: xAxisData.map((_year, yearIdx) => 200 + idx * 80 + yearIdx * 40),
    }));

const IndustryLineChart = ({ theme }: { theme: ThemeItem }) => {
    return (
        <BaseLineChart
            title={theme.title}
            subtitle={theme.subtitle}
            xAxisData={xAxisData}
            series={makeIndustrySeries()}
        />
    );
};

export default IndustryLineChart;
