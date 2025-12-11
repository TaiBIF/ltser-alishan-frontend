// data
import { contactItemList } from "../data/contact";

// components
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";
import MainContact from "../components/MainContact";
import SubContact from "../components/SubContact";

// hooks
import { useBreadcrumb } from "../hooks/useBreadcrumb";
import { usePageTitle } from "../hooks/usePageTitle";

const Contact = () => {
    // 找出符合 pathname 的項目 / 麵包屑
    const { node, trail } = useBreadcrumb();
    usePageTitle(node?.title_zh ?? "");
    const contacts = contactItemList();

    const mainContact = contacts[0];
    const subContacts = contacts.slice(1);

    return (
        <div className="inherit-page">
            <div className="innbox">
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
                        <MainContact data={mainContact} />
                        <div className="line-titlarea">
                            <div className="peo-title">
                                <div className="line1" />
                                計畫執行成員
                                <div className="line2" />
                            </div>
                        </div>
                        <SubContact data={subContacts} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
