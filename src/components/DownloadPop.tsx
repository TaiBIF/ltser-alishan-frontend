import { useState, useEffect, MouseEvent } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";

// context
import { useAuth } from "../context/AuthContext";
import { useDownloadPop } from "../context/DownloadPopContext";

// components
import CloseIcon from "./Icons/CloseIcon";

// helpers
import { swalToast } from "../helpers/CustomSwal";

import { API } from "../config/api";

type FormValues = {
    email: string;
    first_name: string;
    role: string;
    content: string; // 申請原因
};

const DownloadPop = () => {
    const { authFetch } = useAuth();
    const { isOpen, close, params } = useDownloadPop();

    const [initialValues, setInitialValues] = useState<FormValues>({
        email: "",
        first_name: "",
        role: "",
        content: "",
    });
    const [loadingUser, setLoadingUser] = useState(false);

    // 點背景時關閉，點內容區不關閉
    const handleStopPropagation = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (!isOpen) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchMe = async () => {
            try {
                setLoadingUser(true);
                const res = await authFetch(API.auth.userMe, { signal });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();

                setInitialValues((prev) => ({
                    ...prev,
                    email: data.username || data.email || "",
                    first_name: data.first_name || "",
                    role: data.role || "",
                }));
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    swalToast.fire({
                        icon: "error",
                        title: "讀取帳號資料失敗",
                    });
                }
            } finally {
                if (!signal.aborted) {
                    setLoadingUser(false);
                }
            }
        };

        fetchMe();
        return () => controller.abort();
    }, [isOpen, authFetch]);

    if (!isOpen) return null;

    const validate = (values: FormValues) => {
        const errors: Partial<FormValues> = {};

        if (!values.email) {
            errors.email = "請輸入電子信箱";
        }
        if (!values.first_name) {
            errors.first_name = "請輸入姓名";
        }
        if (!values.role) {
            errors.role = "請輸入所屬角色";
        }
        if (!values.content) {
            errors.content = "請填寫申請原因";
        }

        return errors;
    };

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting, resetForm }: any
    ) => {
        try {
            if (!params) {
                // 理論上不會發生，除非 context 沒有帶進來
                swalToast.fire({
                    icon: "error",
                    title: "缺少樣站資訊，請重新操作一次下載",
                });
                return;
            }

            console.log("values from pop:", values);
            console.log("params from pop:", params);

            const res = await authFetch(API.data.download, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: values.email,
                    first_name: values.first_name,
                    role: values.role,
                    reason: values.content,
                    location_id: params.locationID,
                    location_name: params.locationName,
                    year: params.year,
                    items: params.items,
                    mode: params.mode,
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            swalToast.fire({
                icon: "success",
                title: "下載申請已送出",
            });

            resetForm();
            close();
        } catch (err) {
            swalToast.fire({
                icon: "error",
                title: "下載申請失敗，請稍後再試",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="dowload-pop" onClick={close}>
            <div className="flex100">
                <div className="w_bgbox" onClick={handleStopPropagation}>
                    <div className="xx" onClick={close}>
                        <CloseIcon />
                    </div>

                    <div className="title">資料下載申請</div>
                    <div className="login-tip">
                        申請提交後，系統將進行資料處理並在完成後寄送下載連結至您的電子信箱，
                        <br />
                        請留意信箱訊息，並於期限內完成下載。
                    </div>

                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        validate={validate}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="input-item">
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="c-form__input"
                                        placeholder="請輸入電子信箱"
                                        disabled={loadingUser}
                                        required
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="small"
                                        className="error-message"
                                    />
                                </div>

                                <div className="input-item">
                                    <Field
                                        type="text"
                                        id="firstName"
                                        name="first_name"
                                        className="c-form__input"
                                        placeholder="請輸入姓名"
                                        disabled={loadingUser}
                                        required
                                    />
                                    <ErrorMessage
                                        name="first_name"
                                        component="small"
                                        className="error-message"
                                    />
                                </div>

                                <div className="input-item">
                                    <Field
                                        type="text"
                                        id="role"
                                        name="role"
                                        className="c-form__input"
                                        placeholder="請輸入所屬角色"
                                        disabled={loadingUser}
                                        required
                                    />
                                    <ErrorMessage
                                        name="role"
                                        component="small"
                                        className="error-message"
                                    />
                                </div>

                                <p>申請原因</p>
                                <div className="c-form__set__column">
                                    <Field
                                        as="textarea"
                                        id="content"
                                        name="content"
                                        className="c-form__input mb-0"
                                        placeholder="請簡要說明申請下載之用途"
                                        required
                                    />
                                    <ErrorMessage
                                        name="content"
                                        component="small"
                                        className="error-message"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="e-btn e-btn--primary e-btn--wmax"
                                    disabled={isSubmitting || loadingUser}
                                >
                                    {isSubmitting ? "送出中..." : "送出申請"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default DownloadPop;
