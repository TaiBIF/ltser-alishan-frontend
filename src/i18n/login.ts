import type { Lang } from "../context/LangContext";

type LoginTextKey =
    | "googleServiceNotLoaded"
    | "googleCredentialMissing"
    | "googleLoginSuccess"
    | "googleLoginFailed"
    | "serverErrorRetry"
    | "loginSuccess"
    | "invalidEmailOrPassword"
    | "memberLogin"
    | "accountPlaceholder"
    | "passwordPlaceholder"
    | "rememberAccount"
    | "loggingIn"
    | "login"
    | "loginWithGoogle"
    | "googleTip"
    | "createAccount"
    | "forgotPassword"
    | "forgotPasswordTitle"
    | "forgotPasswordDesc"
    | "submit"
    | "goBackLogin"
    | "registerSuccess"
    | "memberRegister"
    | "namePlaceholder"
    | "registerEmailPlaceholder"
    | "registerPasswordPlaceholder"
    | "registerPassword2Placeholder"
    | "registering"
    | "register"
    | "registerAgreePrefix"
    | "termsOfUse"
    | "forgotSubmitSuccess";

type LoginValidationKey =
    | "nameRequired"
    | "emailInvalid"
    | "emailRequired"
    | "passwordMin"
    | "passwordNeedLower"
    | "passwordNeedUpper"
    | "passwordNeedDigit"
    | "passwordRequired"
    | "password2Mismatch"
    | "password2Required"
    | "loginEmailRequired"
    | "loginPasswordRequired";

const LOGIN_TEXT_MAP: Record<LoginTextKey, Record<Lang, string>> = {
    googleServiceNotLoaded: {
        "zh-TW": "Google 登入服務尚未載入",
        en: "Google login service is not loaded yet.",
    },
    googleCredentialMissing: {
        "zh-TW": "無法取得 Google 認證資訊",
        en: "Unable to retrieve Google credential.",
    },
    googleLoginSuccess: {
        "zh-TW": "Google 登入成功",
        en: "Google login successful.",
    },
    googleLoginFailed: {
        "zh-TW": "Google 登入失敗，請稍後再試",
        en: "Google login failed. Please try again later.",
    },
    serverErrorRetry: {
        "zh-TW": "伺服器錯誤，請稍後再試",
        en: "Server error. Please try again later.",
    },
    loginSuccess: {
        "zh-TW": "登入成功",
        en: "Login successful.",
    },
    invalidEmailOrPassword: {
        "zh-TW": "帳號或密碼錯誤",
        en: "Invalid email or password.",
    },
    memberLogin: {
        "zh-TW": "會員登入",
        en: "Member Login",
    },
    accountPlaceholder: {
        "zh-TW": "請輸入您的帳號(email)",
        en: "Please enter your account (email)",
    },
    passwordPlaceholder: {
        "zh-TW": "請輸入您的密碼",
        en: "Please enter your password",
    },
    rememberAccount: {
        "zh-TW": "記住我的帳號",
        en: "Remember my account",
    },
    loggingIn: {
        "zh-TW": "登入中",
        en: "Signing in...",
    },
    login: {
        "zh-TW": "登入",
        en: "Login",
    },
    loginWithGoogle: {
        "zh-TW": "使用 Google 登入",
        en: "Sign in with Google",
    },
    googleTip: {
        "zh-TW":
            "如果按下「使用 Google 登入」沒有反應，\n可能是瀏覽器阻擋了第三方登入（FedCM）或正在使用無痕視窗。\n請改用一般視窗、檢查瀏覽器網站設定，或改用帳號密碼登入。",
        en: "If clicking \"Sign in with Google\" has no response,\nit may be blocked by browser third-party sign-in settings (FedCM) or Incognito mode.\nTry a normal window, check browser site settings, or sign in with email and password.",
    },
    createAccount: {
        "zh-TW": "建立帳號",
        en: "Create Account",
    },
    forgotPassword: {
        "zh-TW": "忘記密碼",
        en: "Forgot Password",
    },
    forgotPasswordTitle: {
        "zh-TW": "忘記密碼",
        en: "Forgot Password",
    },
    forgotPasswordDesc: {
        "zh-TW":
            "請輸入當初加入會員使用的E-Mail，\n我們將協助您重新設定密碼。",
        en: "Please enter the email you used when registering.\nWe will help you reset your password.",
    },
    submit: {
        "zh-TW": "確認送出",
        en: "Submit",
    },
    goBackLogin: {
        "zh-TW": "返回登入",
        en: "Back to Login",
    },
    registerSuccess: {
        "zh-TW": "註冊成功！請登入",
        en: "Registration successful. Please login.",
    },
    memberRegister: {
        "zh-TW": "會員註冊",
        en: "Member Registration",
    },
    namePlaceholder: {
        "zh-TW": "姓名",
        en: "Name",
    },
    registerEmailPlaceholder: {
        "zh-TW": "請輸入您的Email作為帳號",
        en: "Please enter your email as account",
    },
    registerPasswordPlaceholder: {
        "zh-TW": "請輸入您的密碼，需包含大小寫字母與數字",
        en: "Password must include uppercase, lowercase letters and numbers",
    },
    registerPassword2Placeholder: {
        "zh-TW": "請再次輸入密碼",
        en: "Please enter password again",
    },
    registering: {
        "zh-TW": "註冊中",
        en: "Registering...",
    },
    register: {
        "zh-TW": "註冊",
        en: "Register",
    },
    registerAgreePrefix: {
        "zh-TW": "*註冊即同意",
        en: "*By registering, you agree to",
    },
    termsOfUse: {
        "zh-TW": "使用者條款",
        en: "Terms of Use",
    },
    forgotSubmitSuccess: {
        "zh-TW": "如果帳號存在，我們已寄出重設密碼信件",
        en: "If the account exists, a password reset email has been sent.",
    },
};

const LOGIN_VALIDATION_TEXT_MAP: Record<
    LoginValidationKey,
    Record<Lang, string>
> = {
    nameRequired: {
        "zh-TW": "*使用者姓名不可為空",
        en: "*Name is required",
    },
    emailInvalid: {
        "zh-TW": "*Email 格式不正確",
        en: "*Invalid email format",
    },
    emailRequired: {
        "zh-TW": "*Email 不可為空",
        en: "*Email is required",
    },
    passwordMin: {
        "zh-TW": "*密碼至少 8 碼",
        en: "*Password must be at least 8 characters",
    },
    passwordNeedLower: {
        "zh-TW": "*需含小寫字母",
        en: "*Must include a lowercase letter",
    },
    passwordNeedUpper: {
        "zh-TW": "*需含大寫字母",
        en: "*Must include an uppercase letter",
    },
    passwordNeedDigit: {
        "zh-TW": "*需含數字",
        en: "*Must include a number",
    },
    passwordRequired: {
        "zh-TW": "*密碼不可為空",
        en: "*Password is required",
    },
    password2Mismatch: {
        "zh-TW": "*兩次密碼不一致",
        en: "*Passwords do not match",
    },
    password2Required: {
        "zh-TW": "*請再次輸入密碼",
        en: "*Please confirm your password",
    },
    loginEmailRequired: {
        "zh-TW": "*請輸入 Email",
        en: "*Please enter email",
    },
    loginPasswordRequired: {
        "zh-TW": "*請輸入密碼",
        en: "*Please enter password",
    },
};

export function getLoginText(lang: Lang, key: LoginTextKey) {
    return LOGIN_TEXT_MAP[key][lang];
}

export function getLoginValidationText(lang: Lang, key: LoginValidationKey) {
    return LOGIN_VALIDATION_TEXT_MAP[key][lang];
}
