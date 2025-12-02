import { useState } from "react";

// types
import type { ecologicalEconomicsItemType } from "../types/item";

// components
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";
import EcologicalEconomicsFilter from "../components/EcologicalEconomicsFilter";

// hooks
import { useBreadcrumb } from "../hooks/useBreadcrumb";

const EcologicalEconomics = () => {
    // 找出符合 pathname 的項目 / 麵包屑
    const { node, trail } = useBreadcrumb();

    const allInterview: ecologicalEconomicsItemType[] = [];
    const [filteredInterview, setFilteredInterview] =
        useState<ecologicalEconomicsItemType[]>(allInterview);

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
                        尚無任何訪談資料
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EcologicalEconomics;
