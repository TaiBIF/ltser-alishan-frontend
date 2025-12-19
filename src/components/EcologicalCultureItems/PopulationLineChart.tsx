import BaseLineChart from "./BaseLineChart";
import type { LineSeries } from "./BaseLineChart";
import type { ThemeItem } from "../../data/villagePopulationTheme";

type Payload = {
    years: number[];
    metrics: Record<
        string,
        {
            label: string;
            series: Record<string, (number | null)[]>;
        }
    >;
};

const PopulationLineChart = ({
    theme,
    payload,
}: {
    theme: ThemeItem;
    payload: Payload;
}) => {
    const xAxisData = payload.years.map((y) => `${y}年`);

    const metric = payload.metrics?.[theme.key];

    const series: LineSeries[] = metric
        ? Object.entries(metric.series).map(([name, data]) => ({
              type: "line",
              name,
              data, // ✅ 裡面允許 null 才能斷線
          }))
        : [];

    return (
        <BaseLineChart
            title={theme.title || metric?.label || theme.key}
            subtitle={theme.subtitle}
            xAxisData={xAxisData}
            series={series}
        />
    );
};

export default PopulationLineChart;
