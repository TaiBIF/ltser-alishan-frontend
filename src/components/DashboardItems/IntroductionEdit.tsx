import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// context
import { useAuth } from "../../context/AuthContext";

// hooks
import { useDashboardApi } from "../../hooks/useDashboardApi";

// types
import type { IntroductionFieldItemType } from "../../types/dashboard";

// data
import { introductionEditFieldList } from "../../data/dashboard";

// helpers
import { swalToast } from "../../helpers/CustomSwal";

// components
import EditLayout from "./EditLayout";
import Spinner from "../Spinner";

const emptyValues: IntroductionFieldItemType = {
    type: "",
    name: "",
    name_en: "",
    content: "",
    content_en: "",
    image: "",
};

const IntroductionEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const fieldList = useMemo(() => introductionEditFieldList, []);
    const [initialValues, setInitialValues] =
        useState<IntroductionFieldItemType>(emptyValues);
    const [loading, setLoading] = useState(true);
    const { authFetch } = useAuth();
    const { submit, remove, submitting, deleting, abortAll } =
        useDashboardApi<IntroductionFieldItemType>({
            url: `http://localhost:8000/dashboard/introduction/${id}/`,
            fetchFn: authFetch,
            submitMethod: "PATCH",
            buildRequest: (values) => {
                const fd = new FormData();
                if (values.type) fd.append("type", values.type);
                if (values.name) fd.append("name", values.name);
                if (values.content) fd.append("content", values.content);
                if (values.name_en) fd.append("name_en", values.name_en);
                if (values.content_en)
                    fd.append("content_en", values.content_en);
                if (values.image instanceof File)
                    fd.append("media", values.image);
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

    const onSubmit = async (values: IntroductionFieldItemType) => {
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
                    `http://localhost:8000/dashboard/introduction/${id}/`,
                    { signal }
                );

                if (res.status === 404) {
                    await swalToast.fire({
                        icon: "warning",
                        title: "找不到該筆資料，將返回列表",
                    });
                    safeNavigate("/dashboard/introduction/");
                    return;
                }

                if (!res.ok) throw new Error(`Load failed: ${res.status}`);

                const data = await res.json();

                if (signal.aborted) return;
                setInitialValues({
                    type: data.type ?? "",
                    name: data.name ?? "",
                    name_en: data.name_en ?? "",
                    content: data.content ?? "",
                    content_en: data.content_en ?? "",
                    image: data.media_url ?? "",
                });
            } catch (e: any) {
                if (e?.name === "AbortError") return;
                console.error(e?.message);
                await swalToast.fire({
                    icon: "error",
                    title: "載入失敗，請稍後再試",
                });
                safeNavigate("/dashboard/introduction/");
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

export default IntroductionEdit;
