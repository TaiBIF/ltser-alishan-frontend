import * as Yup from "yup";

export const RegisterViewSchema = Yup.object().shape({
    name: Yup.string().trim().required("*使用者姓名不可為空"),
    email: Yup.string()
        .trim()
        .email("*Email 格式不正確")
        .required("*Email 不可為空"),
    password: Yup.string()
        .min(8, "*密碼至少 8 碼")
        .matches(/[a-z]/, "*需含小寫字母")
        .matches(/[A-Z]/, "*需含大寫字母")
        .matches(/\d/, "*需含數字")
        .required("*密碼不可為空"),
    password2: Yup.string()
        .oneOf([Yup.ref("password")], "*兩次密碼不一致")
        .required("*請再次輸入密碼"),
});

export const LoginViewSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email("*Email 格式不正確")
        .required("*請輸入 Email"),
    password: Yup.string().required("*請輸入密碼"),
});

export const ForgotViewSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email("*Email 格式不正確")
        .required("*請輸入 Email"),
});
