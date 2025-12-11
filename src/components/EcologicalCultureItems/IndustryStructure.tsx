// components
import IndustryLineChart from "./IndustryLineChart";

// data
import { industryThemeList } from "../../data/villagePopulationTheme";

const IndustryStructure = () => {
    return (
        <>
            <section className="u-section">
                <div className="village-population-line-chart">
                    {industryThemeList.map((o, i) => (
                        <IndustryLineChart key={i} theme={o} />
                    ))}
                </div>
            </section>

            <section className="u-section">
                <div className="population-data-source">
                    資料來源：SEGIS 社會經濟資料服務平台
                </div>
            </section>
        </>
    );
};

export default IndustryStructure;
