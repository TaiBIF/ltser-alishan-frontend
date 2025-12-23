import { useState, useEffect } from "react";

// components
import Banner from "../components/Banner";
import Breadcrumb from "../components/Breadcrumb";
import AttachmentIcon from "../components/Icons/AttachmentIcon";
import LinkIcon from "../components/Icons/LinkIcon";

// hooks
import { useBreadcrumb } from "../hooks/useBreadcrumb";
import { usePageTitle } from "../hooks/usePageTitle";

// helpers
import { swalToast } from "../helpers/CustomSwal";

import { API } from "../config/api";

// 後端傳遞用資料型別
type FormLinkApiItemType = {
    id: number | string;
    title: string;
    created_at?: string | null;
    is_link?: boolean | null;
    link?: string | null;
    url?: string | null;
    file?: string | null;
};

// 前端呈現用資料型別
type FormLinkItemType = {
    id: number | string;
    created_at: string; // YYYY-MM-DD
    title: string;
    isLink: boolean;
    link: string;
};

const FormLink = () => {
    const [links, setLinks] = useState<FormLinkItemType[]>([]);

    const { node, trail } = useBreadcrumb();
    usePageTitle(node?.title_zh ?? "");

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchFormLink = async () => {
            try {
                const response = await fetch(API.dashboard.formLink, {
                    signal,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: FormLinkApiItemType[] = await response.json();

                const results: FormLinkItemType[] = (data ?? []).map(
                    (item) => ({
                        id: item.id,
                        created_at: item.created_at?.slice(0, 10) ?? "",
                        title: item.title,
                        isLink: item.is_link ?? Boolean(item.link),
                        link: item.url ?? item.link ?? item.file ?? "",
                    })
                );
                setLinks(results);
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    swalToast.fire({
                        icon: "error",
                        title: "獲取資料失敗，請稍後再試",
                    });
                }
            } finally {
            }
        };

        fetchFormLink();

        return () => {
            controller.abort();
        };
    }, []);

    const handleDownloadClick = (url: string): void => {
        if (!url) {
            swalToast.fire({
                icon: "warning",
                title: "檔案連結不存在",
            });
            return;
        }

        // 建立隱藏的 a 來觸發下載
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank"; // 若後端有 Content-Disposition，也會直接下載
        link.rel = "noopener noreferrer";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                        <div className="line-titlarea">
                            <div className="peo-title">
                                <div className="line1" />
                                常用表單與連結
                                <div className="line2" />
                            </div>
                        </div>
                        <ul className="link-list">
                            {links.map((item: FormLinkItemType) => (
                                <li key={item.id}>
                                    <div className="leftbox">
                                        <div className="date">
                                            {item.created_at}
                                        </div>
                                        <p>{item.title}</p>
                                    </div>

                                    {item.isLink ? (
                                        <a
                                            href={item.link}
                                            className="right-icob e-link e-link--icon"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <LinkIcon />
                                        </a>
                                    ) : (
                                        <div
                                            className="right-icob"
                                            onClick={() =>
                                                handleDownloadClick(item.link)
                                            }
                                        >
                                            <AttachmentIcon />
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormLink;
