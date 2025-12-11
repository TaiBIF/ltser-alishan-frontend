import BaseLineChart from "./BaseLineChart";
import type { LineSeries } from "./BaseLineChart";

// data
import villageJson from "../../data/villageGeojson.json";

export type ThemeItem = {
    title: string;
    subtitle: string;
};

const villageNames =
    villageJson.features?.map((f: any) => f.properties.VILLNAME) ?? [];

const xAxisData = ["2018年", "2019年", "2020年", "2021年", "2022年"];

// 假資料
const makePopulationSeries = (): LineSeries[] =>
    villageNames.map((name, idx) => ({
        type: "line",
        name,
        data: xAxisData.map((_year, yearIdx) => 800 + idx * 120 + yearIdx * 60),
    }));

const PopulationLineChart = ({ theme }: { theme: ThemeItem }) => {
    return (
        <BaseLineChart
            title={theme.title}
            subtitle={theme.subtitle}
            xAxisData={xAxisData}
            series={makePopulationSeries()}
        />
    );
};

export default PopulationLineChart;
