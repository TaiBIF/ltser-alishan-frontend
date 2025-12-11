// components
import ArrowIcon from "../../components/Icons/ArrowIcon";
import AreaMap from "./AreaMap";
import PyramidChart from "./PyramidChart";
import PopulationLineChart from "./PopulationLineChart";

// data
import { populaitonThemeList } from "../../data/villagePopulationTheme";

const PopluationStructure = () => {
    return (
        <>
            <div className="infbox-title">
                <div className="titlearea">
                    <h2>
                        人口結構
                        <div className="mark-cir">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={18}
                                height={18}
                                viewBox="0 0 18 18"
                            >
                                <g
                                    id="Ellipse_2931"
                                    data-name="Ellipse 2931"
                                    fill="none"
                                    stroke="#e8d06a"
                                    strokeWidth={4}
                                >
                                    <circle cx={9} cy={9} r={9} stroke="none" />
                                    <circle cx={9} cy={9} r={7} fill="none" />
                                </g>
                            </svg>
                        </div>
                    </h2>
                    <div className="line" />
                </div>
            </div>

            {/* 人口概況 */}
            <section className="u-section">
                <h2 className="c-subtitle">人口概況</h2>
                <div className="c-select c-form__set c-select__flex-container">
                    <div>
                        <label
                            htmlFor="site"
                            className="c-select__label c-form__label"
                        >
                            請選擇年份
                        </label>
                        <div className="c-select__wrapper">
                            <select
                                className="c-select__select"
                                // onChange={(e) => {
                                //     setLocationID(
                                //         e.target.value
                                //     );
                                // }}
                            >
                                <option value="" disabled>
                                    請選擇年份
                                </option>

                                {/* {locations.map(
                                                    (l: LocationItemType) => (
                                                        <option
                                                            key={l.id}
                                                            value={
                                                                l.location_id
                                                            }
                                                        >
                                                            {l.location_name}
                                                        </option>
                                                    )
                                                )} */}
                            </select>
                            <label htmlFor="site" className="c-select__arrow">
                                <ArrowIcon />
                            </label>
                        </div>
                    </div>
                </div>
                <AreaMap />
            </section>

            {/* 人口金字塔 */}
            <section className="u-section">
                <h2 className="c-subtitle">人口概況</h2>
                <div className="c-select c-form__set c-select__flex-container">
                    <div>
                        <label
                            htmlFor="site"
                            className="c-select__label c-form__label"
                        >
                            請選擇年份
                        </label>
                        <div className="c-select__wrapper">
                            <select
                                className="c-select__select"
                                // onChange={(e) => {
                                //     setLocationID(
                                //         e.target.value
                                //     );
                                // }}
                            >
                                <option value="" disabled>
                                    請選擇年份
                                </option>

                                {/* {locations.map(
                                                    (l: LocationItemType) => (
                                                        <option
                                                            key={l.id}
                                                            value={
                                                                l.location_id
                                                            }
                                                        >
                                                            {l.location_name}
                                                        </option>
                                                    )
                                                )} */}
                            </select>
                            <label htmlFor="site" className="c-select__arrow">
                                <ArrowIcon />
                            </label>
                        </div>
                    </div>
                </div>
                <PyramidChart
                    xAxis={["0-4歲", "5-9歲", "10-14歲"]}
                    male={[1000, 1200, 1100]}
                    female={[900, 1150, 1050]}
                />
            </section>

            {/* 人口變遷 */}
            <section className="u-section">
                <h2 className="c-subtitle">人口概況</h2>
                <div className="village-population-line-chart">
                    {populaitonThemeList.map((o, i) => (
                        <PopulationLineChart key={i} theme={o} />
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

export default PopluationStructure;
