import * as Yup from "yup";
import type { Lang } from "../context/LangContext";
import { getLoginValidationText } from "../i18n/login";

export const createRegisterViewSchema = (lang: Lang) =>
    Yup.object().shape({
        name: Yup.string()
            .trim()
            .required(getLoginValidationText(lang, "nameRequired")),
        email: Yup.string()
            .trim()
            .email(getLoginValidationText(lang, "emailInvalid"))
            .required(getLoginValidationText(lang, "emailRequired")),
        password: Yup.string()
            .min(8, getLoginValidationText(lang, "passwordMin"))
            .matches(/[a-z]/, getLoginValidationText(lang, "passwordNeedLower"))
            .matches(/[A-Z]/, getLoginValidationText(lang, "passwordNeedUpper"))
            .matches(/\d/, getLoginValidationText(lang, "passwordNeedDigit"))
            .required(getLoginValidationText(lang, "passwordRequired")),
        password2: Yup.string()
            .oneOf([Yup.ref("password")], getLoginValidationText(lang, "password2Mismatch"))
            .required(getLoginValidationText(lang, "password2Required")),
    });

export const createLoginViewSchema = (lang: Lang) =>
    Yup.object().shape({
        email: Yup.string()
            .trim()
            .email(getLoginValidationText(lang, "emailInvalid"))
            .required(getLoginValidationText(lang, "loginEmailRequired")),
        password: Yup.string().required(
            getLoginValidationText(lang, "loginPasswordRequired"),
        ),
    });

export const createForgotViewSchema = (lang: Lang) =>
    Yup.object().shape({
        email: Yup.string()
            .trim()
            .email(getLoginValidationText(lang, "emailInvalid"))
            .required(getLoginValidationText(lang, "loginEmailRequired")),
    });

export const createResetPswSchema = (lang: Lang) =>
    Yup.object().shape({
        password: Yup.string()
            .min(8, getLoginValidationText(lang, "passwordMin"))
            .matches(/[a-z]/, getLoginValidationText(lang, "passwordNeedLower"))
            .matches(/[A-Z]/, getLoginValidationText(lang, "passwordNeedUpper"))
            .matches(/\d/, getLoginValidationText(lang, "passwordNeedDigit"))
            .required(getLoginValidationText(lang, "passwordRequired")),
        password2: Yup.string()
            .oneOf([Yup.ref("password")], getLoginValidationText(lang, "password2Mismatch"))
            .required(getLoginValidationText(lang, "password2Required")),
    });

export const RegisterViewSchema = createRegisterViewSchema("zh-TW");
export const LoginViewSchema = createLoginViewSchema("zh-TW");
export const ForgotViewSchema = createForgotViewSchema("zh-TW");
export const ResetPswSchema = createResetPswSchema("zh-TW");
