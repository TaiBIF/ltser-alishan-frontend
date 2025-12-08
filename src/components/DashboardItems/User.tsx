import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { API } from "../../config/api";

// components
import FieldLayout from "./FieldLayout";

// helpers
import { swalToast } from "../../helpers/CustomSwal";

// context
import { useAuth } from "../../context/AuthContext";

import type { RelateTypes } from "../../types/dashboard";

type FormValues = {
    email: string;
    first_name: string;
    role: string;
};

const emptyValues: FormValues = {
    email: "",
    first_name: "",
    role: "",
};

type FieldItem = {
    id: string | number;
    type: string;
    title: string;
    label: string;
    options?: RelateTypes[];
    readonly?: boolean;
    required?: boolean;
    hints?: RelateTypes[];
    multiple?: boolean;
    cover?: number | string;
    fileType?: string;
};

const userFieldList: FieldItem[] = [
    {
        id: 1,
        type: "email",
        title: "email",
        label: "帳號",
        readonly: true,
        required: true,
    },
    { id: 2, type: "text", title: "first_name", label: "姓名", required: true },
    // { id: 3, type: "text", title: "last_name", label: "名", required: true },
    { id: 3, type: "text", title: "role", label: "角色", required: true },
];

const User = () => {
    const { authFetch, logout } = useAuth();
    const [initialValues, setInitialValues] = useState<FormValues>(emptyValues);

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
                    setInitialValues({
                        email: data.username || "",
                        first_name: data.first_name || "",
                        role: data.role || "",
                    });
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

    const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
        try {
            const res = await authFetch(API.auth.userMe, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (res.status === 401) {
                logout();
                swalToast.fire({
                    icon: "error",
                    title: "登入已過期，請重新登入",
                });
                return;
            }

            if (!res.ok) {
                const errBody = await res.json().catch(() => null);
                console.error("update me error:", res.status, errBody);
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            swalToast.fire({
                icon: "success",
                title: "儲存成功",
            });
        } catch (err) {
            swalToast.fire({
                icon: "error",
                title: "儲存失敗，請稍後再試",
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            <Form className="d-flex flex-column justify-content-between h-100">
                <div>
                    {userFieldList.map((field) => (
                        <FieldLayout data={field} key={field.id} />
                    ))}
                </div>

                <div className="c-btns">
                    <button
                        type="submit"
                        className="c-btns__btn e-btn e-btn--primary e-btn--wmax"
                    >
                        {/* {!loading ? "儲存" : <Spinner layout="dashboard" />} */}
                        儲存
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default User;
