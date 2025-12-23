import { Link } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { API } from "../../config/api";

// helpers
import { swalToast } from "../../helpers/CustomSwal";

// data
import { RegisterViewSchema } from "../../data/schema";

type PopupView = "login" | "register" | "forgot";

interface RegisterViewProps {
    setView: Dispatch<SetStateAction<PopupView>>;
}

const RegisterView = ({ setView }: RegisterViewProps) => {
    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
                password2: "",
            }}
            validationSchema={RegisterViewSchema}
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
                            title: "註冊成功！請登入",
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
                        title: "伺服器錯誤，請稍後再試",
                    });
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form className="register-set">
                    <div className="titlebox">會員註冊</div>

                    <div className="input-item">
                        <Field type="text" name="name" placeholder="姓名" />
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
                            placeholder="請輸入您的Email作為帳號"
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
                            placeholder="請輸入您的密碼，需包含大小寫字母與數字"
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
                            placeholder="請再次輸入密碼"
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
                            {isSubmitting ? "註冊中" : "註冊"}
                        </button>
                    </div>

                    <div className="btn-area2">
                        <button
                            className="back-btn"
                            type="button"
                            onClick={() => setView("login")}
                        >
                            返回登入
                        </button>
                        <div className="link">
                            <span className="col-red">*註冊即同意</span>{" "}
                            <Link to="#">使⽤者條款</Link>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterView;
