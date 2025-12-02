import { useNavigate } from "react-router-dom";

// types
import type { IntroductionFieldItemType } from "../../types/dashboard";

// hooks
import { useDashboardApi } from "../../hooks/useDashboardApi";

// data
import { introductionEditFieldList } from "../../data/dashboard";

// context
import { useAuth } from "../../context/AuthContext";

// helpers
import { swalToast } from "../../helpers/CustomSwal";

// components
import AddLayout from "./AddLayout";

const initialValues: IntroductionFieldItemType = {
    type: "ecology",
    name: "",
    name_en: "",
    content: "",
    content_en: "",
    image: "",
};

const IntroductionAdd = () => {
    const navigate = useNavigate();
    const { authFetch } = useAuth();

    // const submitControllerRef = useRef<AbortController | null>(null);

    // useEffect(() => {
    //     return () => {
    //         submitControllerRef.current?.abort();
    //     };
    // }, []);

    // const onSubmit = async (
    //     values: IntroductionFieldItemType,
    //     formikHelpers?: {
    //         setSubmitting: (s: boolean) => void;
    //         resetForm: () => void;
    //     }
    // ) => {
    //     try {
    //         const url = "http://localhost:8000/dashboard/introduction/";

    //         submitControllerRef.current?.abort();
    //         const controller = new AbortController();
    //         submitControllerRef.current = controller;
    //         const { signal } = controller;

    //         const fd = new FormData();
    //         if (values.type) fd.append("type", values.type);
    //         if (values.name) fd.append("name", values.name);
    //         if (values.content) fd.append("content", values.content);
    //         if (values.name_en) fd.append("name_en", values.name_en);
    //         if (values.content_en) fd.append("content_en", values.content_en);
    //         if (values.image instanceof File) {
    //             fd.append("media", values.image);
    //         }

    //         const res = await authFetch(url, {
    //             method: "POST",
    //             body: fd,
    //             signal,
    //         });

    //         const data = await res.json().catch(() => ({}));
    //         if (!res.ok) {
    //             throw new Error(
    //                 (data && (data.detail || JSON.stringify(data))) ||
    //                     `Create failed: ${res.status}`
    //             );
    //         }

    //         formikHelpers?.resetForm();
    //         navigate("/dashboard/introduction");
    //         swalToast.fire({ icon: "success", title: "新增成功，將返回列表" });
    //     } catch (e: any) {
    //         if (e?.name === "AbortError") return;
    //         console.error(e);
    //         await swalToast.fire({
    //             icon: "error",
    //             title: "新增失敗，請稍後再試",
    //         });
    //     } finally {
    //         formikHelpers?.setSubmitting(false);
    //         window.scrollTo({ top: 0, behavior: "smooth" });

    //         submitControllerRef.current = null;
    //     }
    // };
    const { submit, submitting } = useDashboardApi<IntroductionFieldItemType>({
        url: "http://localhost:8000/dashboard/introduction/",
        fetchFn: authFetch,
        submitMethod: "POST",
        buildRequest: (values) => {
            const fd = new FormData();
            if (values.type) fd.append("type", values.type);
            if (values.name) fd.append("name", values.name);
            if (values.content) fd.append("content", values.content);
            if (values.name_en) fd.append("name_en", values.name_en);
            if (values.content_en) fd.append("content_en", values.content_en);
            if (values.image instanceof File) fd.append("media", values.image);
            return { body: fd };
        },
        onSubmitSuccess: async () => {
            swalToast.fire({
                icon: "success",
                title: "新增成功，將返回列表",
            });
            navigate("/dashboard/introduction");
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
        onSubmitError: async (e) => {
            console.error(e);
            await swalToast.fire({
                icon: "error",
                title: "新增失敗，請稍後再試",
            });
            window.scrollTo({ top: 0, behavior: "smooth" });
        },
    });

    const onSubmit = async (
        values: IntroductionFieldItemType,
        formikHelpers?: {
            setSubmitting: (s: boolean) => void;
            resetForm: () => void;
        }
    ) => {
        try {
            await submit(values);
            formikHelpers?.resetForm();
        } finally {
            formikHelpers?.setSubmitting(false);
        }
    };

    return (
        <AddLayout
            initialValues={initialValues}
            onSubmit={onSubmit}
            fieldList={introductionEditFieldList}
            submitting={submitting}
        />
    );
};

export default IntroductionAdd;
