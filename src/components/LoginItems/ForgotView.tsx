import type { Dispatch, SetStateAction } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

// data
import { ForgotViewSchema } from "../../data/schema";

// helpers
import { swalToast } from "../../helpers/CustomSwal";

import { API } from "../../config/api";

type PopupView = "login" | "register" | "forgot";

interface ForgotViewProps {
    onSuccess?: () => void;
    setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
    setView: Dispatch<SetStateAction<PopupView>>;
}

const ForgotView = ({ setView }: ForgotViewProps) => {
    return (
        <Formik
            initialValues={{ email: "" }}
            validationSchema={ForgotViewSchema}
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
                            title: "如果帳號存在，我們已寄出重設密碼信件",
                        });
                        setView("login");
                    }
                } catch {
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
                        <div className="forget-set">
                            <div className="titlebox">忘記密碼</div>
                            <p>
                                請輸入當初加入會員使用的E-Mail，
                                <br />
                                我們將協助您重新設定密碼。
                            </p>

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

                            <div className="btn-area">
                                <button
                                    className="login"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    確認送出
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
                                    className="back-btn"
                                    type="button"
                                    onClick={() => setView("login")}
                                >
                                    返回登入
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
