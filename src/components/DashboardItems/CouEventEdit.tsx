import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// context
import { useAuth } from "../../context/AuthContext";

// hooks
import { useDashboardApi } from "../../hooks/useDashboardApi";

// types
import type { CouEventFieldItemType } from "../../types/dashboard";

// data
import { couEventTableColumnList } from "../../data/dashboard";

// helpers
import { swalToast } from "../../helpers/CustomSwal";

// components
import EditLayout from "./EditLayout";
import Spinner from "../Spinner";

const emptyValues: CouEventFieldItemType = {
    type: "",
    location: "",
    date: "",
    content: "",
    images: [],
};

const CouEventEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const fieldList = useMemo(() => couEventTableColumnList, []);
    const [initialValues, setInitialValues] =
        useState<CouEventFieldItemType>(emptyValues);
    const [loading, setLoading] = useState(true);
    const { authFetch } = useAuth();
    const { submit, remove, submitting, deleting, abortAll } =
        useDashboardApi<CouEventFieldItemType>({
            url: `http://localhost:8000/dashboard/couevent/${id}/`,
            fetchFn: authFetch,
            submitMethod: "PATCH",
            buildRequest: (values) => {
                const fd = new FormData();
                if (values.type) fd.append("type", values.type);
                if (values.location) fd.append("location", values.location);
                if (values.date) fd.append("date", values.date);
                if (values.content) fd.append("content", values.content);

                // 多圖：如果你的表單是陣列，逐一 append
                if (Array.isArray(values.images)) {
                    values.images.forEach((f) => {
                        if ((f as any) instanceof File) fd.append("images", f);
                    });
                } else if ((values.images as any) instanceof File) {
                    fd.append("images", values.images);
                }
                return { body: fd };
            },
            onSubmitSuccess: async () => {
                swalToast.fire({
                    icon: "success",
                    title: "更新成功，將返回列表",
                });
                navigate("/dashboard/introduction/");
                window.scrollTo({ top: 0, behavior: "smooth" });
            },
            onSubmitError: async (e: any) => {
                console.error(e);
                await swalToast.fire({
                    icon: "error",
                    title: "更新失敗，請稍後再試",
                });
                window.scrollTo({ top: 0, behavior: "smooth" });
            },
            onDeleteSuccess: async () => {
                swalToast.fire({
                    icon: "success",
                    title: "刪除成功，將返回列表",
                });
                navigate("/dashboard/introduction/", { replace: true });
                window.scrollTo({ top: 0, behavior: "smooth" });
            },
            onDeleteError: async (e: any) => {
                console.error(e);
                await swalToast.fire({
                    icon: "error",
                    title: "刪除失敗，請稍後再試",
                });
                window.scrollTo({ top: 0, behavior: "smooth" });
            },
        });

    const onSubmit = async (values: CouEventFieldItemType) => {
        await submit(values);
    };

    const handleDeleteClick = async () => {
        await remove();
    };

    useEffect(() => {
        if (!id) return;

        const controller = new AbortController();
        const { signal } = controller;

        const safeNavigate = (to: string) => {
            if (!signal.aborted) navigate(to, { replace: true });
        };

        const getCurrentItem = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `http://localhost:8000/dashboard/couevent/${id}/`,
                    { signal }
                );

                if (res.status === 404) {
                    await swalToast.fire({
                        icon: "warning",
                        title: "找不到該筆資料，將返回列表",
                    });
                    safeNavigate("/dashboard/couevent/");
                    return;
                }

                if (!res.ok) throw new Error(`Load failed: ${res.status}`);

                const data = await res.json();

                if (signal.aborted) return;
                setInitialValues({
                    type: data.type ?? "",
                    location: data.location ?? "",
                    date: data.date ?? "",
                    content: data.content ?? "",
                    images: Array.isArray(data.images)
                        ? data.images.map((img: any) => ({ image: img.image }))
                        : [],
                });
            } catch (e: any) {
                if (e?.name === "AbortError") return;
                console.error(e?.message);
                await swalToast.fire({
                    icon: "error",
                    title: "載入失敗，請稍後再試",
                });
                safeNavigate("/dashboard/couevent/");
            } finally {
                if (!signal.aborted) setLoading(false);
            }
        };

        getCurrentItem();

        return () => controller.abort();
    }, [id, navigate]);

    useEffect(() => () => abortAll(), []);

    if (loading) return <Spinner />;

    return (
        <EditLayout
            initialValues={initialValues}
            onSubmit={onSubmit}
            fieldList={fieldList}
            onDelete={handleDeleteClick}
            deleting={deleting}
            submitting={submitting}
        />
    );
};

export default CouEventEdit;
