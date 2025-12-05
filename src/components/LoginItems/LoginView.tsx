import type { Dispatch, SetStateAction } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { API } from "../../config/api";
import { ENV } from "../../config/env";

// context
import { useAuth } from "../../context/AuthContext";

// data
import { LoginViewSchema } from "../../data/schema";

// helpers
import { swalToast } from "../../helpers/CustomSwal";

// components
import Spinner from "../Spinner";

type PopupView = "login" | "register" | "forgot";

interface LoginViewProps {
    onSuccess?: () => void;
    setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
    setView: Dispatch<SetStateAction<PopupView>>;
}

function decodeExp(jwt: string): number | null {
    try {
        const payload = JSON.parse(atob(jwt.split(".")[1] ?? ""));
        return typeof payload.exp === "number" ? payload.exp * 1000 : null;
    } catch {
        return null;
    }
}

const LoginView = ({ onSuccess, setIsLoginOpen, setView }: LoginViewProps) => {
    const { login } = useAuth();

    const handleGoogleLogin = () => {
        // @ts-ignore
        const google = window.google;

        if (!google) {
            swalToast.fire({ icon: "error", title: "Google 登入服務尚未載入" });
            return;
        }

        google.accounts.id.initialize({
            client_id: ENV.googleClientId,
            callback: async (response: any) => {
                const credential = response.credential;

                if (!credential) {
                    swalToast.fire({
                        icon: "error",
                        title: "無法取得 Google 認證資訊",
                    });
                    return;
                }

                try {
                    const res = await fetch(API.auth.googleLogin, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ credential }),
                    });

                    const data = await res.json().catch(() => ({}));

                    if (res.ok) {
                        const { access, refresh } = data;

                        if (!access || !refresh) {
                            throw new Error("Invalid token response");
                        }

                        login(access, refresh);

                        const accessExp = decodeExp(access);
                        localStorage.setItem("accessToken", access);
                        localStorage.setItem("refreshToken", refresh);
                        if (accessExp)
                            localStorage.setItem(
                                "accessExp",
                                String(accessExp)
                            );

                        swalToast.fire({
                            icon: "success",
                            title: "Google 登入成功",
                        });

                        setIsLoginOpen(false);
                        onSuccess?.();
                    } else {
                        swalToast.fire({
                            icon: "error",
                            title: data.detail || "Google 登入失敗，請稍後再試",
                        });
                    }
                } catch (e) {
                    console.error(e);
                    swalToast.fire({
                        icon: "error",
                        title: "伺服器錯誤，請稍後再試",
                    });
                }
            },
        });

        // 顯示 Google 選帳號視窗
        google.accounts.id.prompt();
    };

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginViewSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                    const res = await fetch(API.auth.login, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: values.email.trim(),
                            password: values.password,
                        }),
                        // credentials: "include",
                    });

                    const data = await res.json().catch(() => ({}));

                    if (res.ok) {
                        const { access, refresh } = data;
                        login(access, refresh);
                        const accessExp = decodeExp(access);
                        if (!access || !refresh)
                            throw new Error("Invalid token response");

                        localStorage.setItem("accessToken", access);
                        localStorage.setItem("refreshToken", refresh);
                        if (accessExp)
                            localStorage.setItem(
                                "accessExp",
                                String(accessExp)
                            );

                        swalToast.fire({ icon: "success", title: "登入成功" });
                        setIsLoginOpen(false);
                        onSuccess?.();
                    } else {
                        const detail =
                            typeof data.detail === "string" ? data.detail : "";
                        if (detail) {
                            setErrors({ password: "帳號或密碼錯誤" });
                        } else {
                            const fieldErrors: Record<string, string> = {};
                            for (const k in data) {
                                const v = data[k];
                                fieldErrors[k] = Array.isArray(v)
                                    ? v.join("、")
                                    : String(v);
                            }
                            setErrors(fieldErrors);
                        }
                    }
                } catch (e) {
                    console.error(e);
                    swalToast.fire({
                        icon: "error",
                        title: "伺服器錯誤，請稍後再試",
                    });
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    {
                        <div className="login-set">
                            <div className="titlebox">會員登入</div>

                            <div className="input-item">
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="請輸入您的帳號(email)"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="error-message"
                                />
                            </div>

                            <div className="input-item">
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="請輸入您的密碼"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="error-message"
                                />
                            </div>

                            <div className="check-area">
                                <label className="check-item">
                                    記住我的帳號
                                    <Field type="checkbox" name="remember" />
                                    <span className="checkmark"></span>
                                </label>
                            </div>

                            <div className="btn-area">
                                <button
                                    className="login"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "登入中" : "登入"}
                                </button>
                                <button
                                    className="logingoogle"
                                    type="button"
                                    onClick={handleGoogleLogin}
                                >
                                    使用GOOGLE登入
                                </button>
                            </div>

                            <div className="btn-area2">
                                <button
                                    className="res-btn"
                                    type="button"
                                    onClick={() => setView("register")}
                                >
                                    建立帳號
                                </button>
                                <button
                                    className="forget-btn"
                                    type="button"
                                    onClick={() => setView("forgot")}
                                >
                                    忘記密碼
                                </button>
                            </div>
                        </div>
                    }
                </Form>
            )}
        </Formik>
    );
};

export default LoginView;
