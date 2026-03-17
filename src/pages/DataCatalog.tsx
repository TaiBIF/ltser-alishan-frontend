import { Link } from "react-router-dom";

// components
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";

// hooks
import { useBreadcrumb } from "../hooks/useBreadcrumb";
import { usePageTitle } from "../hooks/usePageTitle";

// data
import { catalogList } from "../data/dataCatlog";

const DataCatalog = () => {
    const { node, trail } = useBreadcrumb();
    usePageTitle(node?.title_zh ?? "");

    const typeCount = catalogList.reduce<Record<string, number>>(
        (acc, item) => {
            acc[item.type] = (acc[item.type] || 0) + 1;
            return acc;
        },
        {},
    );

    return (
        <div className="inherit-page">
            {node && (
                <Banner
                    title={node.title_zh}
                    en={node.title_en}
                    bgImg={node.bg_img}
                />
            )}

            <Breadcrumb trail={trail} />
            <div className="contentbox">
                <div className="main-box">
                    <div className="terms-editer">
                        <p>
                            本頁彙整 LTSER
                            阿里山站長期社會生態核心觀測資料。若您需要完整觀測資料，請先登入會員，並點擊下方表格的對應觀測項目頁面，使用「資料下載」或「物種名錄下載」功能進行取得。使用前請先詳閱本網站{" "}
                            <Link
                                to="/privacy-policy"
                                className="highlight-link"
                            >
                                隱私權政策
                            </Link>{" "}
                            與{" "}
                            <Link to="/terms-of-use" className="highlight-link">
                                使用者條款
                            </Link>
                            ，並依規範使用。
                        </p>
                        <div className="data-catalog-table-area">
                            <div className="ovhbox">
                                <table
                                    border={0}
                                    cellSpacing={0}
                                    cellPadding={0}
                                    className="table-style1"
                                >
                                    <tbody>
                                        <tr>
                                            <td>類型</td>
                                            <td>資料集名稱</td>
                                        </tr>
                                        {catalogList.map((item, index) => (
                                            <tr
                                                key={`${item.type}-${item.name}-${index}`}
                                            >
                                                {index === 0 ||
                                                catalogList[index - 1].type !==
                                                    item.type ? (
                                                    <td
                                                        rowSpan={
                                                            typeCount[item.type]
                                                        }
                                                        style={{
                                                            verticalAlign:
                                                                "top",
                                                            whiteSpace:
                                                                "nowrap",
                                                        }}
                                                    >
                                                        {item.type}
                                                    </td>
                                                ) : null}
                                                <td>
                                                    <div>
                                                        <Link
                                                            to={item.link}
                                                            className="highlight-link"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                        <p>
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataCatalog;
