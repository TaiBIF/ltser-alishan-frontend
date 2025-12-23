import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { swalToast } from "../helpers/CustomSwal";
import { API } from "../config/api";

interface AuthContextValue {
    isLoggedIn: boolean;
    isStaff: boolean;
    login: (access: string, refresh: string) => void;
    logout: () => void;
    authFetch: (
        input: RequestInfo | URL,
        init?: RequestInit
    ) => Promise<Response>;
}

type MeResponse = {
    username?: string;
    first_name?: string;
    is_staff: boolean;
    role?: string;
};

const AuthContext = createContext<AuthContextValue>({
    isLoggedIn: false,
    isStaff: false,
    login: () => {},
    logout: () => {},
    authFetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, init),
});

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";
const ACCESS_EXP_KEY = "accessExp"; // 秒 timestamp

// base64url 安全解析 + 取 exp（秒）
function decodeExp(jwt: string): number | null {
    try {
        const base64url = jwt.split(".")[1];
        const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
        const json = atob(base64);
        const payload = JSON.parse(json);
        return typeof payload.exp === "number" ? payload.exp : null;
    } catch {
        return null;
    }
}

function getAccess() {
    return localStorage.getItem(ACCESS_KEY);
}
function getRefresh() {
    return localStorage.getItem(REFRESH_KEY);
}
function setTokens(access: string, refresh?: string) {
    localStorage.setItem(ACCESS_KEY, access);
    const exp = decodeExp(access);
    if (exp) localStorage.setItem(ACCESS_EXP_KEY, String(exp));
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
}
function clearTokens() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(ACCESS_EXP_KEY);
}
function isAccessExpired(skewSeconds = 30) {
    const expStr = localStorage.getItem(ACCESS_EXP_KEY);
    if (!expStr) return true;
    const exp = Number(expStr); // 秒
    const now = Math.floor(Date.now() / 1000);
    return now >= exp - skewSeconds;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(Boolean(getAccess()));
    const [isStaff, setIsStaff] = useState<boolean>(false);

    // 嘗試用 refresh 恢復 session（例如頁面重整後 access 過期）
    useEffect(() => {
        const init = async () => {
            try {
                const access = getAccess();

                if (access && !isAccessExpired()) {
                    setIsLoggedIn(true);
                    await fetchMe();
                    return;
                }

                const newAccess = await refreshAccessToken();
                if (newAccess) {
                    setIsLoggedIn(true);
                    await fetchMe();
                } else {
                    setIsLoggedIn(false);
                    setIsStaff(false);
                }
            } finally {
            }
        };

        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // cross-tab login sync
    useEffect(() => {
        const onStorage = () => {
            setIsLoggedIn(Boolean(localStorage.getItem(ACCESS_KEY)));
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const fetchMe = async (): Promise<boolean> => {
        try {
            const res = await authFetch(API.auth.userMe);
            if (!res.ok) return false;

            const me = (await res.json()) as MeResponse;
            setIsStaff(Boolean(me.is_staff));
            return true;
        } catch {
            setIsStaff(false);
            return false;
        }
    };

    const login = async (access: string, refresh: string) => {
        setTokens(access, refresh);
        setIsLoggedIn(true);
        await fetchMe();
    };

    const logout = () => {
        clearTokens();
        setIsLoggedIn(false);
        setIsStaff(false);
        swalToast.fire({ icon: "success", title: "登出成功" });
    };

    // 用 refresh 換新的 access（SimpleJWT 預設路由）
    const refreshAccessToken = async (): Promise<string | null> => {
        const refresh = getRefresh();
        if (!refresh) return null;

        const res = await fetch(API.auth.refresh, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh }),
        });

        if (!res.ok) return null;

        const data = await res.json().catch(() => ({} as any));
        const { access, refresh: newRefresh } = data as {
            access?: string;
            refresh?: string;
        };
        if (!access) return null;

        setTokens(access, newRefresh);
        return access;
    };

    // 包裝 fetch：自動帶 Authorization，必要時 refresh 並重試一次
    const authFetch = useMemo(() => {
        return async (input: RequestInfo | URL, init: RequestInit = {}) => {
            // 確保有有效 access
            let token = getAccess();
            if (!token || isAccessExpired()) {
                token = await refreshAccessToken();
            }
            if (!token) {
                // 沒拿到 → 當作未登入
                const err = new Error("No valid token");
                // @ts-ignore
                err.status = 401;
                throw err;
            }

            // 附加 Authorization
            const headers = new Headers(init.headers || {});
            if (!headers.has("Authorization")) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            const first = await fetch(input, { ...init, headers });

            // 若 401，再嘗試 refresh 然後重試一次
            if (first.status === 401) {
                const newToken = await refreshAccessToken();
                if (!newToken) return first;
                headers.set("Authorization", `Bearer ${newToken}`);
                return fetch(input, { ...init, headers });
            }

            return first;
        };
    }, []); // 無需依賴 state，讀取的是 localStorage

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, isStaff, login, logout, authFetch }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
