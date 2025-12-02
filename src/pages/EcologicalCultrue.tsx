// components
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";

// hooks
import { useBreadcrumb } from "../hooks/useBreadcrumb";

const EcologicalCultrue = () => {
    // 找出符合 pathname 的項目 / 麵包屑
    const { node, trail } = useBreadcrumb();
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
        </div>
    );
};

export default EcologicalCultrue;
