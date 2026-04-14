import { useRef, useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLang } from "../context/LangContext";

// components
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";
import AsideItem from "../components/AsideItem";
import PopluationStructure from "../components/EcologicalCultureItems/PopluationStructure";
import IndustryStructure from "../components/EcologicalCultureItems/IndustryStructure";

// hooks
import { useBreadcrumb } from "../hooks/useBreadcrumb";
import { usePageTitle } from "../hooks/usePageTitle";
import {
    getObservationText,
    resolveObservationAsideTitle,
} from "../i18n/observation";

// types
import type { AsideItemType } from "../types/item";

// data
import { ecologicalCultureAsideItemList } from "../data/asideItem";

// animation
import { gsapSlideToggle } from "../utils/animation";

type ViewKey = "population" | "industry";

const EcologicalCultrue = () => {
    const { item } = useParams<{ item?: ViewKey }>();
    const { lang } = useLang();
    const navigate = useNavigate();
    const [active, setActive] = useState<boolean>(false);
    const targetRef = useRef<HTMLUListElement>(null);
    const { node, trail } = useBreadcrumb();
    usePageTitle(
        (lang === "en" ? node?.title_en : node?.title_zh)?.replace(/\n/g, " ") ??
            "",
    );

    const view: ViewKey = item === "industry" ? "industry" : "population";

    const allAside = useMemo<AsideItemType[]>(() => {
        return ecologicalCultureAsideItemList();
    }, []);

    const handleMobileClick = () => {
        setActive((prev) => !prev);
    };

    // 沒帶 itemKey 時導到第一個子項的 key
    useEffect(() => {
        if (!allAside?.length) return;
        if (item) return;

        const firstChild = allAside[0]?.list?.[0];
        if (firstChild) {
            navigate(`/observation/ecological-culture/${firstChild.key}`, {
                replace: true,
            });
        }
    }, [allAside, item, navigate]);

    // 手機版 aside 收合動畫
    useEffect(() => {
        const target = targetRef.current;
        if (!target) return;
        target.style.display = "block";
        gsapSlideToggle("auto", target, active);
    }, [active]);

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
                    <div className="observation-box gray-bg">
                        {/* 左側目錄 */}
                        <div
                            className="left-mainmenu"
                            style={{ overflow: "visible" }}
                        >
                            <div className="btn-mb" onClick={handleMobileClick}>
                                <p>{getObservationText(lang, "mobileItemSelect")}</p>
                            </div>

                            <ul
                                className="level-1 c-aside u-slide-toggle"
                                ref={targetRef}
                            >
                                {allAside &&
                                    allAside.map((aside, index) => (
                                        <AsideItem
                                            key={aside.id}
                                            item={aside}
                                            currentItemKey={item ?? ""}
                                            onSelect={(child: any) => {
                                                navigate(
                                                    `/observation/ecological-culture/${child.key}`
                                                );
                                            }}
                                            resolveLabel={(key, label) =>
                                                resolveObservationAsideTitle(
                                                    key,
                                                    label,
                                                    lang,
                                                )
                                            }
                                            defaultOpen={index === 0}
                                        />
                                    ))}
                            </ul>
                        </div>

                        {/* 右側內容 */}
                        <div className="right-infbox">
                            {view === "population" && <PopluationStructure />}

                            {view === "industry" && <IndustryStructure />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EcologicalCultrue;
