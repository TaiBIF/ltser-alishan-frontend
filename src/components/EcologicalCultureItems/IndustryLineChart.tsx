import BaseLineChart from "./BaseLineChart";
import type { LineSeries } from "./BaseLineChart";
import type { ThemeItem } from "../../data/villagePopulationTheme";
import { useLang } from "../../context/LangContext";
import {
    getObservationText,
    resolveObservationChartLegend,
    resolveIndustryThemeSubtitle,
    resolveIndustryThemeTitle,
} from "../../i18n/observation";

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
    const { lang } = useLang();
    const xAxisData = (payload.years ?? []).map(
        (y) => `${y}${getObservationText(lang, "yearSuffix")}`,
    );

    const chart = payload.charts?.[theme.key];

    const series: LineSeries[] = (chart?.series ?? []).map((s) => ({
        type: "line",
        name: resolveObservationChartLegend(s.name, lang),
        data: s.data,
    }));

    return (
        <BaseLineChart
            title={resolveIndustryThemeTitle(theme.key, theme.title, lang)}
            subtitle={resolveIndustryThemeSubtitle(
                theme.key,
                theme.subtitle,
                lang,
            )}
            xAxisData={xAxisData}
            series={series}
            legendPosition="right"
        />
    );
};

export default IndustryLineChart;
