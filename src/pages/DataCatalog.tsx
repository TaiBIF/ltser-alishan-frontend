import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";

// components
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";

// hooks
import { useBreadcrumb } from "../hooks/useBreadcrumb";
import { usePageTitle } from "../hooks/usePageTitle";
import {
    getObservationText,
    resolveObservationCatalogDescription,
    resolveObservationCatalogName,
    resolveObservationCatalogType,
} from "../i18n/observation";

// data
import { catalogList } from "../data/dataCatlog";

const DataCatalog = () => {
    const { lang } = useLang();
    const { node, trail } = useBreadcrumb();
    usePageTitle(
        (lang === "en" ? node?.title_en : node?.title_zh)?.replace(/\n/g, " ") ??
            "",
    );

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
                            {getObservationText(lang, "dataCatalogDescriptionStart")}{" "}
                            <Link
                                to="/privacy-policy"
                                className="highlight-link"
                            >
                                {getObservationText(lang, "privacyPolicy")}
                            </Link>{" "}
                            {getObservationText(lang, "dataCatalogDescriptionMiddle")}{" "}
                            <Link to="/terms-of-use" className="highlight-link">
                                {getObservationText(lang, "termsOfUse")}
                            </Link>
                            {" "}
                            {getObservationText(lang, "dataCatalogDescriptionEnd")}
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
                                            <td>{getObservationText(lang, "catalogType")}</td>
                                            <td>
                                                {getObservationText(
                                                    lang,
                                                    "catalogDatasetName",
                                                )}
                                            </td>
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
                                                        {resolveObservationCatalogType(
                                                            item.type,
                                                            lang,
                                                        )}
                                                    </td>
                                                ) : null}
                                                <td>
                                                    <div>
                                                        <Link
                                                            to={item.link}
                                                            className="highlight-link"
                                                        >
                                                            {resolveObservationCatalogName(
                                                                item.link,
                                                                item.name,
                                                                lang,
                                                            )}
                                                        </Link>
                                                        <p>
                                                            {resolveObservationCatalogDescription(
                                                                item.link,
                                                                item.description,
                                                                lang,
                                                            )}
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
