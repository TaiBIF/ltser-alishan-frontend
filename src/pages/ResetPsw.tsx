import { useSearchParams, useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";

// data
import { ResetPswSchema } from "../data/schema";

// hooks
import { usePageTitle } from "../hooks/usePageTitle";

// helpers
import { swalToast } from "../helpers/CustomSwal";

import { API } from "../config/api";

const ResetPsw = () => {
    usePageTitle("重新設定密碼");
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const uid = params.get("uid");
    const token = params.get("token");

    return (
        <div className="contentbox gray-bg">
            <div className="main-box">
                <div className="box-1000">
                    <div className="line-titlarea">
                        <div className="peo-title">
                            <div className="line1" />
                            重新設定密碼
                            <div className="line2" />
                        </div>
                    </div>
                    <p className="center marb_20">
                        您可在下方欄位修改您的密碼，下次請使用新的密碼登入
                    </p>
                    <div className="inpbox">
                        <Formik
                            initialValues={{ password: "", password2: "" }}
                            validationSchema={ResetPswSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                try {
                                    const res = await fetch(
                                        API.auth.passResetConfirm,
                                        {
                                            method: "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify({
                                                uid: uid,
                                                token: token,
                                                password: values.password,
                                            }),
                                        }
                                    );

                                    const data = await res.json();

                                    if (res.ok) {
                                        swalToast.fire({
                                            icon: "success",
                                            title:
                                                data.detail || "密碼已成功重設",
                                        });
                                        navigate("/");
                                    } else {
                                        swalToast.fire({
                                            icon: "error",
                                            title:
                                                data.detail || "重設密碼失敗",
                                        });
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
                                    <div className="flex-input c-form">
                                        <div className="c-form__set__column">
                                            <label
                                                htmlFor="password"
                                                className="visually-hidden"
                                            >
                                                新密碼
                                            </label>
                                            <Field
                                                type="password"
                                                id="password"
                                                name="password"
                                                className="c-form__input"
                                                placeholder="請輸入密碼，需包含大小寫字母與數字"
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="small"
                                                className="error-message"
                                            />
                                        </div>
                                        <div className="c-form__set__column">
                                            <label
                                                htmlFor="password2"
                                                className="visually-hidden"
                                            >
                                                確認新密碼
                                            </label>
                                            <Field
                                                type="password"
                                                id="password2"
                                                name="password2"
                                                className="c-form__input"
                                                placeholder="再次輸入新密碼"
                                            />
                                            <ErrorMessage
                                                name="password2"
                                                component="small"
                                                className="error-message"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="send"
                                        disabled={isSubmitting}
                                    >
                                        確認送出
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPsw;
