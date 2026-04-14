import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import type { ReactNode } from "react";

export type Lang = "zh-TW" | "en";

type LangContextValue = {
    lang: Lang;
    setLang: (lang: Lang) => void;
};

const STORAGE_KEY = "site_lang";

const LangContext = createContext<LangContextValue | null>(null);

function getInitialLang(): Lang {
    if (typeof window === "undefined") return "zh-TW";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "en" ? "en" : "zh-TW";
}

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>(getInitialLang);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;
    }, [lang]);

    const value = useMemo(() => ({ lang, setLang }), [lang]);

    return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
    const ctx = useContext(LangContext);
    if (!ctx) {
        throw new Error("useLang must be used within LangProvider");
    }
    return ctx;
}
