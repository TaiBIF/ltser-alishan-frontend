import type { Dispatch, SetStateAction } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLang } from "../../context/LangContext";

// data
import { createForgotViewSchema } from "../../data/schema";

// helpers
import { swalToast } from "../../helpers/CustomSwal";
import { getLoginText } from "../../i18n/login";

import { API } from "../../config/api";

type PopupView = "login" | "register" | "forgot";

interface ForgotViewProps {
    onSuccess?: () => void;
    setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
    setView: Dispatch<SetStateAction<PopupView>>;
}

const ForgotView = ({ setView }: ForgotViewProps) => {
    const { lang } = useLang();
    return (
        <Formik
            initialValues={{ email: "" }}
            validationSchema={createForgotViewSchema(lang)}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    const res = await fetch(API.auth.passReset, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: values.email.trim() }),
                    });

                    // 無論該 Email 是否存在，都顯示同樣訊息，避免洩漏帳號存在與否
                    if (res.ok) {
                        swalToast.fire({
                            icon: "success",
                            title: getLoginText(lang, "forgotSubmitSuccess"),
                        });
                        setView("login");
                    }
                } catch {
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
                        <div className="forget-set">
                            <div className="titlebox">
                                {getLoginText(lang, "forgotPasswordTitle")}
                            </div>
                            <p style={{ whiteSpace: "pre-line" }}>
                                {getLoginText(lang, "forgotPasswordDesc")}
                            </p>

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

                            <div className="btn-area">
                                <button
                                    className="login"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {getLoginText(lang, "submit")}
                                </button>
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
                                    className="back-btn"
                                    type="button"
                                    onClick={() => setView("login")}
                                >
                                    {getLoginText(lang, "goBackLogin")}
                                </button>
                            </div>
                        </div>
                    }
                </Form>
            )}
        </Formik>
    );
};

export default ForgotView;
