import type { Dispatch, SetStateAction } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { API } from "../../config/api";
import { ENV } from "../../config/env";

// context
import { useAuth } from "../../context/AuthContext";
import { useLang } from "../../context/LangContext";

// data
import { createLoginViewSchema } from "../../data/schema";

// helpers
import { swalToast } from "../../helpers/CustomSwal";
import { getLoginText } from "../../i18n/login";

type PopupView = "login" | "register" | "forgot";

interface LoginViewProps {
    onSuccess?: () => void;
    setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
    setView: Dispatch<SetStateAction<PopupView>>;
}

type LoginFormValues = {
    email: string;
    password: string;
    remember: boolean;
};

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
    const { lang } = useLang();

    const handleGoogleLogin = () => {
        // @ts-ignore
        const google = window.google;

        if (!google) {
            swalToast.fire({
                icon: "error",
                title: getLoginText(lang, "googleServiceNotLoaded"),
            });
            return;
        }

        google.accounts.id.initialize({
            client_id: ENV.googleClientId,
            callback: async (response: any) => {
                const credential = response.credential;

                if (!credential) {
                    swalToast.fire({
                        icon: "error",
                        title: getLoginText(lang, "googleCredentialMissing"),
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
                            title: getLoginText(lang, "googleLoginSuccess"),
                        });

                        setIsLoginOpen(false);
                        onSuccess?.();
                    } else {
                        swalToast.fire({
                            icon: "error",
                            title:
                                data.detail ||
                                getLoginText(lang, "googleLoginFailed"),
                        });
                    }
                } catch (e) {
                    console.error(e);
                    swalToast.fire({
                        icon: "error",
                        title: getLoginText(lang, "serverErrorRetry"),
                    });
                }
            },
        });

        // 顯示 Google 選帳號視窗
        google.accounts.id.prompt();
    };

    let savedEmail = "";
    if (typeof window !== "undefined") {
        savedEmail = localStorage.getItem("rememberedEmail") || "";
    }

    const initialValues: LoginFormValues = {
        email: savedEmail,
        password: "",
        remember: !!savedEmail, // 有存過 email 就預設打勾
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={createLoginViewSchema(lang)}
            onSubmit={async (
                values,
                { setSubmitting, setErrors, resetForm }
            ) => {
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

                        // 記住帳號
                        const trimmedEmail = values.email.trim();
                        if (values.remember) {
                            localStorage.setItem(
                                "rememberedEmail",
                                trimmedEmail
                            );
                        } else {
                            localStorage.removeItem("rememberedEmail");
                        }

                        // 重置表單，把密碼清掉
                        resetForm({
                            values: {
                                email: values.remember ? trimmedEmail : "",
                                password: "",
                                remember: values.remember,
                            },
                        });

                        swalToast.fire({
                            icon: "success",
                            title: getLoginText(lang, "loginSuccess"),
                        });
                        setIsLoginOpen(false);
                        onSuccess?.();
                    } else {
                        const detail =
                            typeof data.detail === "string" ? data.detail : "";
                        if (detail) {
                            setErrors({
                                password: getLoginText(
                                    lang,
                                    "invalidEmailOrPassword",
                                ),
                            });
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
                        title: getLoginText(lang, "serverErrorRetry"),
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
                            <div className="titlebox">
                                {getLoginText(lang, "memberLogin")}
                            </div>

                            <div className="input-item">
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder={getLoginText(
                                        lang,
                                        "accountPlaceholder",
                                    )}
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
                                    placeholder={getLoginText(
                                        lang,
                                        "passwordPlaceholder",
                                    )}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="error-message"
                                />
                            </div>

                            <div className="check-area">
                                <label className="check-item">
                                    {getLoginText(lang, "rememberAccount")}
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
                                    {isSubmitting
                                        ? getLoginText(lang, "loggingIn")
                                        : getLoginText(lang, "login")}
                                </button>
                                <button
                                    className="logingoogle"
                                    type="button"
                                    onClick={handleGoogleLogin}
                                >
                                    {getLoginText(lang, "loginWithGoogle")}
                                </button>
                            </div>

                            <div
                                className="login-tip"
                                style={{ whiteSpace: "pre-line" }}
                            >
                                {getLoginText(lang, "googleTip")}
                            </div>

                            <div className="btn-area2">
                                <button
                                    className="res-btn"
                                    type="button"
                                    onClick={() => setView("register")}
                                >
                                    {getLoginText(lang, "createAccount")}
                                </button>
                                <button
                                    className="forget-btn"
                                    type="button"
                                    onClick={() => setView("forgot")}
                                >
                                    {getLoginText(lang, "forgotPassword")}
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
