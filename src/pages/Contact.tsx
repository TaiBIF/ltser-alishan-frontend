import { useState, useEffect, useMemo } from "react";

// types
import type { ContactItemType } from "../types/item";

// components
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";
import MainContact from "../components/MainContact";
import SubContact from "../components/SubContact";

// hooks
import { useBreadcrumb } from "../hooks/useBreadcrumb";
import { usePageTitle } from "../hooks/usePageTitle";

// helpers
import { swalToast } from "../helpers/CustomSwal";

import { API } from "../config/api";

const Contact = () => {
    // 找出符合 pathname 的項目 / 麵包屑
    const { node, trail } = useBreadcrumb();
    usePageTitle(node?.title_zh ?? "");

    const [allContact, setAllContact] = useState<ContactItemType[]>([]);

    const { mainContact, subContacts } = useMemo(() => {
        const main = allContact.find((c) => c.sorting_order === 0) ?? null;

        const subs = allContact
            .filter((c) => c.sorting_order !== 0)
            .slice() //
            .sort((a, b) => a.sorting_order - b.sorting_order);

        return {
            mainContact: main,
            subContacts: subs,
        };
    }, [allContact]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function loadAll() {
            try {
                const res = await fetch(API.dashboard.contact, { signal });
                if (!res.ok) throw new Error(`Contact HTTP ${res.status}`);

                const json = await res.json();
                const data: ContactItemType[] = Array.isArray(json)
                    ? json
                    : json?.results ?? [];

                setAllContact(data);
            } catch (err: any) {
                if (err?.name !== "AbortError") {
                    swalToast.fire({
                        icon: "error",
                        title: "獲取資料失敗，請稍後再試",
                    });
                }
            } finally {
            }
        }

        loadAll();
        return () => controller.abort();
    }, []);

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
                        {mainContact && <MainContact data={mainContact} />}
                        <div className="line-titlarea">
                            <div className="peo-title">
                                <div className="line1" />
                                計畫執行成員
                                <div className="line2" />
                            </div>
                        </div>
                        {subContacts && <SubContact data={subContacts} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
