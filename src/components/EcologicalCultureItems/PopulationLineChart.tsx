import BaseLineChart from "./BaseLineChart";
import type { LineSeries } from "./BaseLineChart";
import type { ThemeItem } from "../../data/villagePopulationTheme";
import { useLang } from "../../context/LangContext";
import {
    getObservationText,
    resolveObservationChartLegend,
    resolvePopulationThemeSubtitle,
    resolvePopulationThemeTitle,
} from "../../i18n/observation";

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
    const { lang } = useLang();
    const xAxisData = payload.years.map(
        (y) => `${y}${getObservationText(lang, "yearSuffix")}`,
    );

    const metric = payload.metrics?.[theme.key];

    const series: LineSeries[] = metric
        ? Object.entries(metric.series).map(([name, data]) => ({
              type: "line",
              name: resolveObservationChartLegend(name, lang),
              data, // ✅ 裡面允許 null 才能斷線
          }))
        : [];

    return (
        <BaseLineChart
            title={resolvePopulationThemeTitle(
                theme.key,
                theme.title || metric?.label || theme.key,
                lang,
            )}
            subtitle={resolvePopulationThemeSubtitle(
                theme.key,
                theme.subtitle,
                lang,
            )}
            xAxisData={xAxisData}
            series={series}
        />
    );
};

export default PopulationLineChart;
