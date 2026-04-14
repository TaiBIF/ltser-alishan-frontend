// components
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";

// hooks
import { useBreadcrumb } from "../hooks/useBreadcrumb";
import { usePageTitle } from "../hooks/usePageTitle";
import { useLang } from "../context/LangContext";
import { getPrivacyPolicyDoc } from "../i18n/legal";

const PrivacyPolicy = () => {
    const { lang } = useLang();
    const doc = getPrivacyPolicyDoc(lang);
    const { node, trail } = useBreadcrumb();
    usePageTitle(
        (lang === "en" ? node?.title_en : node?.title_zh)?.replace(/\n/g, " ") ??
            "",
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
                        <h3 className="color-green">{doc.siteName}</h3>
                        <br />
                        <h3 className="color-green">{doc.docTitle}</h3>
                        <br />
                        <h3 className="color-green">{doc.updatedAt}</h3>
                        <br />
                        {doc.intro.map((paragraph, idx) => (
                            <p key={`intro-${idx}`}>{paragraph}</p>
                        ))}
                        {doc.sections.map((section, idx) => (
                            <div key={section.heading + idx}>
                                <br />
                                <h3 className="color-green">{section.heading}</h3>
                                {section.paragraphs.map((paragraph, pIdx) => (
                                    <p key={`${section.heading}-${pIdx}`}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
