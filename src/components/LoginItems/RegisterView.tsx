import { Link } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { API } from "../../config/api";
import { useLang } from "../../context/LangContext";

// helpers
import { swalToast } from "../../helpers/CustomSwal";
import { getLoginText } from "../../i18n/login";

// data
import { createRegisterViewSchema } from "../../data/schema";

type PopupView = "login" | "register" | "forgot";

interface RegisterViewProps {
    setView: Dispatch<SetStateAction<PopupView>>;
}

const RegisterView = ({ setView }: RegisterViewProps) => {
    const { lang } = useLang();
    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
                password2: "",
            }}
            validationSchema={createRegisterViewSchema(lang)}
            onSubmit={async (
                values,
                { setSubmitting, setErrors, resetForm }
            ) => {
                try {
                    const res = await fetch(API.auth.register, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(values),
                    });

                    if (res.ok) {
                        swalToast.fire({
                            icon: "success",
                            title: getLoginText(lang, "registerSuccess"),
                        });
                        resetForm();
                        setView("login");
                    } else {
                        const data = await res.json();

                        // 後端回欄位錯誤格式處理
                        let backendErrors: Record<string, string> = {};
                        for (const key in data)
                            backendErrors[key] = data[key].join
                                ? data[key].join("、")
                                : data[key];

                        setErrors(backendErrors);
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
                <Form className="register-set">
                    <div className="titlebox">
                        {getLoginText(lang, "memberRegister")}
                    </div>

                    <div className="input-item">
                        <Field
                            type="text"
                            name="name"
                            placeholder={getLoginText(lang, "namePlaceholder")}
                        />
                        <ErrorMessage
                            name="name"
                            component="div"
                            className="error-message"
                        />
                    </div>

                    <div className="input-item">
                        <Field
                            type="email"
                            name="email"
                            placeholder={getLoginText(
                                lang,
                                "registerEmailPlaceholder",
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
                                "registerPasswordPlaceholder",
                            )}
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="error-message"
                        />
                    </div>

                    <div className="input-item">
                        <Field
                            type="password"
                            name="password2"
                            placeholder={getLoginText(
                                lang,
                                "registerPassword2Placeholder",
                            )}
                        />
                        <ErrorMessage
                            name="password2"
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
                            {isSubmitting
                                ? getLoginText(lang, "registering")
                                : getLoginText(lang, "register")}
                        </button>
                    </div>

                    <div className="btn-area2">
                        <button
                            className="back-btn"
                            type="button"
                            onClick={() => setView("login")}
                        >
                            {getLoginText(lang, "goBackLogin")}
                        </button>
                        <div className="link">
                            <span className="col-red">
                                {getLoginText(lang, "registerAgreePrefix")}
                            </span>{" "}
                            <Link to="/terms-of-use">
                                {getLoginText(lang, "termsOfUse")}
                            </Link>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterView;
