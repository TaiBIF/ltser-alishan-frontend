import { useState } from "react";
import { useLang } from "../context/LangContext";

// types
import type { EcologicalEconomicsItemType } from "../types/item";

// components
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";
import EcologicalEconomicsFilter from "../components/EcologicalEconomicsFilter";

// hooks
import { useBreadcrumb } from "../hooks/useBreadcrumb";
import { usePageTitle } from "../hooks/usePageTitle";
import { getObservationText } from "../i18n/observation";

const EcologicalEconomics = () => {
    const { lang } = useLang();
    // 找出符合 pathname 的項目 / 麵包屑
    const { node, trail } = useBreadcrumb();
    usePageTitle(
        (lang === "en" ? node?.title_en : node?.title_zh)?.replace(/\n/g, " ") ??
            "",
    );

    const allInterview: EcologicalEconomicsItemType[] = [];
    const [filteredInterview, setFilteredInterview] =
        useState<EcologicalEconomicsItemType[]>(allInterview);

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
            <div className="contentbox gray-bg">
                <div className="main-box">
                    {/* 篩選區 */}
                    <EcologicalEconomicsFilter
                        allEvent={allInterview}
                        onFiltered={setFilteredInterview}
                    />

                    {/* 結果區 */}
                    <div
                        className="event-result-box"
                        style={{
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "center",
                        }}
                    >
                        {filteredInterview.length === 0 &&
                            getObservationText(lang, "interviewNoData")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EcologicalEconomics;
