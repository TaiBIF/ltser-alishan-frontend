import BaseLineChart from "./BaseLineChart";
import type { LineSeries } from "./BaseLineChart";
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

const IndustryLineChart = ({
    theme,
    payload,
}: {
    theme: ThemeItem;
    payload: IndustryPayload;
}) => {
    const xAxisData = (payload.years ?? []).map((y) => `${y}年`);

    const chart = payload.charts?.[theme.key];

    const series: LineSeries[] = (chart?.series ?? []).map((s) => ({
        type: "line",
        name: s.name,
        data: s.data,
    }));

    return (
        <BaseLineChart
            title={theme.title}
            subtitle={theme.subtitle}
            xAxisData={xAxisData}
            series={series}
            legendPosition="right"
        />
    );
};

export default IndustryLineChart;
