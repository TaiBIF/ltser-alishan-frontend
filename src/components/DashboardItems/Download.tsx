import { useEffect, useState } from "react";

// types
import type { ColumnItemType } from "../../types/dashboard";

// components
import ListLayout from "./ListLayout";

// context
import { useAuth } from "../../context/AuthContext";

// helpers
import { swalToast } from "../../helpers/CustomSwal";

import { API } from "../../config/api";

const DownloadColumnList: ColumnItemType[] = [
    {
        id: "id",
        title: "下載ID",
        show: true,
    },
    {
        id: "items",
        title: "觀測項目",
        show: true,
    },
    {
        id: "created_at",
        title: "下載申請時間",
        show: true,
    },
];

const Download = () => {
    const { authFetch, logout } = useAuth();
    const [email, setEmail] = useState("");
    const [downloadData, setDownloadData] = useState<
        {
            id: string;
            items: string;
            created_at: string;
        }[]
    >([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchUserMe = async () => {
            try {
                const response = await authFetch(API.auth.userMe, {
                    signal,
                });

                if (response.status === 401) {
                    logout();
                    swalToast.fire({
                        icon: "error",
                        title: "登入已過期，請重新登入",
                    });
                    return;
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data) {
                    setEmail(data.username || "");
                }
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

        fetchUserMe();

        return () => {
            controller.abort();
        };
    }, [authFetch, logout]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchDownload = async () => {
            try {
                const response = await authFetch(
                    API.dashboard.downloadHisotry(email),
                    { signal }
                );

                if (response.status === 401) {
                    logout();
                    swalToast.fire({
                        icon: "error",
                        title: "登入已過期，請重新登入",
                    });
                    return;
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);

                if (data?.results) {
                    const formattedData = data.results.map((item: any) => ({
                        id: String(item.id),
                        items: Array.isArray(item.items)
                            ? item.items.join(", ")
                            : item.items,
                        created_at: item.created_at,
                    }));

                    setDownloadData(formattedData);
                }
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    swalToast.fire({
                        icon: "error",
                        title: "獲取資料失敗，請稍後再試",
                    });
                }
            }
        };

        fetchDownload();

        return () => controller.abort();
    }, [email]);

    return (
        <>
            <ListLayout
                tableColumnList={DownloadColumnList}
                tableRowList={downloadData}
            />
        </>
    );
};

export default Download;
