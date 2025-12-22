import { useMap } from "react-leaflet";

// context
import { useAuth } from "../../context/AuthContext";
import { useDownloadPop } from "../../context/DownloadPopContext";

// helpers
import { swalToast } from "../../helpers/CustomSwal";

interface StationPopupProps {
    locationID: string;
    locationName: string;
    selectedYear: string;
    observationItem: { [year: string]: string[] };
    onViewChart: (args: {
        locationID: string;
        locationName: string;
        year: string;
        items: string[];
    }) => void;
}

const StationPopup = ({
    locationID,
    locationName,
    selectedYear,
    observationItem,
    onViewChart,
}: StationPopupProps) => {
    const map = useMap();
    const { isLoggedIn } = useAuth();
    const { open: openDownloadPop } = useDownloadPop();

    const itemsThisYear = observationItem[selectedYear] ?? [];

    const handleClose = () => {
        map.closePopup(); // 關掉目前開啟的 popup
    };

    const handleViewChart = () => {
        onViewChart({
            locationID: locationID,
            locationName,
            year: selectedYear,
            items: itemsThisYear,
        });

        map.closePopup();
    };

    const handleDownloadClick = async () => {
        if (!isLoggedIn) {
            swalToast.fire({
                icon: "warning",
                title: "請登入帳號以取得下載觀測資料權限",
            });
            return;
        }

        openDownloadPop({
            locationID,
            locationName,
            year: selectedYear,
            items: itemsThisYear,
            mode: "selected",
        });
    };

    return (
        <div className="wbox-cont">
            <div className="rel">
                <button className="xx" onClick={handleClose}>
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

                <h3 className="item-title">{locationName}</h3>

                <table
                    className="map-tablestyle"
                    border={0}
                    cellPadding="0"
                    cellSpacing="0"
                >
                    <thead>
                        <tr>
                            <td>調查年份</td>
                            <td>{selectedYear}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>觀測項目</td>
                            <td>
                                <ul
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        listStyle: "none",
                                    }}
                                >
                                    {itemsThisYear.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="align-center">
                    <button className="link-more" onClick={handleViewChart}>
                        <p>查看圖表</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30.999"
                            height="9.001"
                            viewBox="0 0 30.999 9.001"
                        >
                            <path
                                id="Union_71"
                                data-name="Union 71"
                                d="M10362.5-601h-30a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h28.794l-7.147-7.147a.5.5,0,0,1,0-.7.5.5,0,0,1,.708,0l7.98,7.98a.513.513,0,0,1,.083.1l0,0,.008.013a.5.5,0,0,1,.049.406s0,0,0,0l-.006.017,0,.012,0,.008a.5.5,0,0,1-.415.309h0l-.023,0Z"
                                transform="translate(-10332.001 610.001)"
                                fill="#654d26"
                            />
                        </svg>
                    </button>

                    <button className="link-more" onClick={handleDownloadClick}>
                        <p>資料下載</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30.999"
                            height="9.001"
                            viewBox="0 0 30.999 9.001"
                        >
                            <path
                                id="Union_71"
                                data-name="Union 71"
                                d="M10362.5-601h-30a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h28.794l-7.147-7.147a.5.5,0,0,1,0-.7.5.5,0,0,1,.708,0l7.98,7.98a.513.513,0,0,1,.083.1l0,0,.008.013a.5.5,0,0,1,.049.406s0,0,0,0l-.006.017,0,.012,0,.008a.5.5,0,0,1-.415.309h0l-.023,0Z"
                                transform="translate(-10332.001 610.001)"
                                fill="#654d26"
                            />
                        </svg>
                    </button>
                </div>

                <div className="arr">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="11.804"
                        height="8.934"
                        viewBox="0 0 11.804 8.934"
                    >
                        <path
                            id="Polygon_9"
                            data-name="Polygon 9"
                            d="M5.9,0l5.9,8.934H0Z"
                            transform="translate(11.804 8.934) rotate(180)"
                            fill="#fff"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default StationPopup;
