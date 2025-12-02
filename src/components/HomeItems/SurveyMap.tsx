import { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    ZoomControl,
} from "react-leaflet";
import { API } from "../../config/api";

import { divIcon } from "leaflet";

// comnponents
import StationPopup from "./StationPopup";
import HomeVisualization from "./HomeVisualization";

const customIcon = divIcon({
    html: `
        <div class="pin-icon">
            <div class="rel">
                <svg xmlns="http://www.w3.org/2000/svg" width="25.278" height="25.276" viewBox="0 0 25.278 25.276">
                    <path id="Union_71" data-name="Union 71" d="M23.21,24.921,18.74,20.458a11.275,11.275,0,0,1-15.411-.694A11.719,11.719,0,0,1,.866,7.161a11.516,11.516,0,0,1,4.192-5.2,11.253,11.253,0,0,1,12.694,0,11.51,11.51,0,0,1,4.192,5.2,11.729,11.729,0,0,1,.646,6.676A11.61,11.61,0,0,1,20.405,18.7l4.517,4.509a1.212,1.212,0,1,1-1.713,1.715ZM6.688,4.349a8.631,8.631,0,0,0-3.143,3.9,8.846,8.846,0,0,0-.488,5.036A8.732,8.732,0,0,0,5.4,17.743a8.386,8.386,0,0,0,12.013,0,8.729,8.729,0,0,0,2.342-4.46,8.843,8.843,0,0,0-.487-5.036,8.628,8.628,0,0,0-3.144-3.9,8.362,8.362,0,0,0-9.433,0Zm7.719,4.677a2.663,2.663,0,0,0-2.735-1.611A1.212,1.212,0,0,1,11.417,5a5.09,5.09,0,0,1,5.223,3.077,1.212,1.212,0,1,1-2.232.944Z" fill="#654d26"></path>
                </svg>
            </div>
        </div>
    `,
    className: "", // 關閉 leaflet 預設樣式
    iconSize: [30, 30],
    iconAnchor: [15, 30],
});

type IconPositionItemType = {
    location_id: string;
    location_name: string;
    decimal_longitude: number;
    decimal_latitude: number;
    position: [number, number];
    years: { [year: string]: string[] };
};

type FilterItemType = {
    [year: string]: string[];
};

type ChartTarget = {
    locationID: string;
    locationName: string;
    year: string;
    items: string[]; // 該站該年的觀測項目（中文）
};

const SurveyMap = () => {
    const position: [number, number] = [23.5, 120.8];
    const [iconPosition, setIconPosition] = useState<IconPositionItemType[]>(
        []
    );
    const [filter, setFilter] = useState<FilterItemType[]>([]);
    const [yearOptions, setYearOptions] = useState<string[]>([]);
    const [itemOptions, setItemOptions] = useState<string[]>([]);

    const [selectedYear, setSelectedYear] = useState<string>("2024");
    const [selectedItem, setSelectedItem] = useState<string>("");

    const [chartTarget, setChartTarget] = useState<ChartTarget | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function loadMapPosition() {
            try {
                const params = new URLSearchParams();

                if (selectedYear) params.append("year", selectedYear);
                if (selectedItem) params.append("item", selectedItem);

                const url = `${API.map.position}?${params.toString()}`;

                const res = await fetch(url, { signal });
                const data = await res.json();

                setIconPosition(data);
            } catch (err: any) {
                if (err.name === "AbortError") return;
                console.error(err);
            }
        }

        loadMapPosition();
        return () => controller.abort();
    }, [selectedYear, selectedItem]);

    useEffect(() => {
        const controller = new AbortController();

        async function loadMapFilter() {
            try {
                const res = await fetch(API.map.filter, {
                    signal: controller.signal,
                });
                const data: FilterItemType[] = await res.json();

                setFilter(data);

                const years = Object.keys(data).sort();
                setYearOptions(years);

                // 初始觀測項目（全部年份 union）
                const allItems = Array.from(
                    new Set(years.flatMap((y) => data[y]))
                );
                setItemOptions(allItems);
            } catch (err: any) {
                if (err.name === "AbortError") return;
                console.error(err);
            }
        }

        loadMapFilter();
        return () => controller.abort();
    }, []);

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const year = e.target.value;
        setSelectedYear(year);
        setSelectedItem(""); // 年份換了，先清空已選觀測項目

        // 只顯示這一年有的觀測項目
        const items = filter[year] ?? [];
        setItemOptions(items);
    };

    const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const item = e.target.value;
        setSelectedItem(item);
    };

    return (
        <section className="s4-sumap">
            <div className="main-1600">
                <div className="index-title flex-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="133"
                        height="34"
                        viewBox="0 0 133 34"
                    >
                        <g
                            id="Group_7736"
                            data-name="Group 7736"
                            transform="translate(-6655 -518)"
                        >
                            <g
                                id="Ellipse_2953"
                                data-name="Ellipse 2953"
                                transform="translate(6754 518)"
                                fill="#73bf73"
                                stroke="#654d26"
                                strokeWidth="2"
                            >
                                <circle
                                    cx="17"
                                    cy="17"
                                    r="17"
                                    stroke="none"
                                ></circle>
                                <circle
                                    cx="17"
                                    cy="17"
                                    r="16"
                                    fill="none"
                                ></circle>
                            </g>
                            <g
                                id="Ellipse_2957"
                                data-name="Ellipse 2957"
                                transform="translate(6655 518)"
                                fill="#75a6ef"
                                stroke="#654d26"
                                strokeWidth="2"
                            >
                                <circle
                                    cx="17"
                                    cy="17"
                                    r="17"
                                    stroke="none"
                                ></circle>
                                <circle
                                    cx="17"
                                    cy="17"
                                    r="16"
                                    fill="none"
                                ></circle>
                            </g>
                            <g
                                id="Ellipse_2956"
                                data-name="Ellipse 2956"
                                transform="translate(6680 518)"
                                fill="#f66858"
                                stroke="#654d26"
                                strokeWidth="2"
                            >
                                <circle
                                    cx="17"
                                    cy="17"
                                    r="17"
                                    stroke="none"
                                ></circle>
                                <circle
                                    cx="17"
                                    cy="17"
                                    r="16"
                                    fill="none"
                                ></circle>
                            </g>
                            <g
                                id="Ellipse_2954"
                                data-name="Ellipse 2954"
                                transform="translate(6729 518)"
                                fill="#f5ce2b"
                                stroke="#654d26"
                                strokeWidth="2"
                            >
                                <ellipse
                                    cx="17.5"
                                    cy="17"
                                    rx="17.5"
                                    ry="17"
                                    stroke="none"
                                ></ellipse>
                                <ellipse
                                    cx="17.5"
                                    cy="17"
                                    rx="16.5"
                                    ry="16"
                                    fill="none"
                                ></ellipse>
                            </g>
                            <g
                                id="Ellipse_2955"
                                data-name="Ellipse 2955"
                                transform="translate(6704 518)"
                                fill="#fff"
                                stroke="#654d26"
                                strokeWidth="2"
                            >
                                <circle
                                    cx="17"
                                    cy="17"
                                    r="17"
                                    stroke="none"
                                ></circle>
                                <circle
                                    cx="17"
                                    cy="17"
                                    r="16"
                                    fill="none"
                                ></circle>
                            </g>
                        </g>
                    </svg>
                    <h2>survey map</h2>
                </div>

                <div className="map-area">
                    <div className="select-box">
                        <h3>年份/觀測項目篩選</h3>
                        <div className="select-itembox">
                            <div className="select-itembox">
                                {/* 年份 */}
                                <select
                                    name="year"
                                    id="year-select"
                                    value={selectedYear}
                                    onChange={handleYearChange}
                                >
                                    {/* <option value="">全部年份</option> */}
                                    {yearOptions.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>

                                {/* 觀測項目（顯示中文） */}
                                <select
                                    name="item"
                                    id="item-select"
                                    value={selectedItem}
                                    onChange={handleItemChange}
                                >
                                    <option value="">全部觀測項目</option>
                                    {itemOptions.map((item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="map-box">
                        <div className="map-wrapper">
                            <MapContainer
                                center={position}
                                zoom={11}
                                scrollWheelZoom={false}
                                zoomControl={false}
                                style={{ height: "100%", width: "100%" }} // 自己調整高度
                            >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {iconPosition.map((item, index) => {
                                    return (
                                        <Marker
                                            key={item.location_id ?? index}
                                            position={item.position}
                                            icon={customIcon}
                                        >
                                            <Popup
                                                closeButton={false}
                                                className="station-popup"
                                                autoPan={true}
                                                autoPanPadding={[20, 80]}
                                                keepInView
                                                offset={[0, -80]}
                                                maxWidth={450}
                                            >
                                                <StationPopup
                                                    locationID={
                                                        item.location_id
                                                    }
                                                    locationName={
                                                        item.location_name
                                                    }
                                                    selectedYear={selectedYear}
                                                    observationItem={item.years}
                                                    onViewChart={({
                                                        locationID,
                                                        locationName,
                                                        year,
                                                        items,
                                                    }) =>
                                                        setChartTarget({
                                                            locationID,
                                                            locationName,
                                                            year,
                                                            items,
                                                        })
                                                    }
                                                />
                                            </Popup>
                                        </Marker>
                                    );
                                })}

                                <ZoomControl position="topright" />
                            </MapContainer>

                            {chartTarget && (
                                <div className="chart-overlay">
                                    <div className="chart-panel">
                                        <div className="chart-panel-header">
                                            <h4>
                                                {chartTarget.year}–{" "}
                                                {chartTarget.locationName}–{" "}
                                                {chartTarget.items.length
                                                    ? chartTarget.items.join(
                                                          "｜"
                                                      )
                                                    : "無"}
                                            </h4>
                                            <button
                                                className="xx"
                                                onClick={() =>
                                                    setChartTarget(null)
                                                }
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="9.816"
                                                    height="9.818"
                                                    viewBox="0 0 9.816 9.818"
                                                >
                                                    <path
                                                        id="Union_72"
                                                        data-name="Union 72"
                                                        d="M10334.963-702.33l-4.055-4.054-4.055,4.054a.5.5,0,0,1-.353.148.5.5,0,0,1-.355-.148.5.5,0,0,1,0-.706l4.056-4.056-4.056-4.056a.5.5,0,0,1,0-.706.5.5,0,0,1,.708,0l4.055,4.054,4.055-4.054a.5.5,0,0,1,.708,0,.5.5,0,0,1,0,.706l-4.056,4.056,4.056,4.056a.5.5,0,0,1,0,.706.5.5,0,0,1-.354.148A.5.5,0,0,1,10334.963-702.33Z"
                                                        transform="translate(-10326 712.001)"
                                                        fill="#654d26"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="chart-panel-body">
                                            <HomeVisualization
                                                locationID={
                                                    chartTarget.locationID
                                                }
                                                year={chartTarget.year}
                                                observationItems={
                                                    chartTarget.items
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="montbg">
                <img src="/montbg2.png" alt="" />
            </div>
        </section>
    );
};

export default SurveyMap;
