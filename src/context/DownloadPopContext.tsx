import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useCallback,
} from "react";

export type DownloadMode = "selected" | "item_all" | "catalog";

type DownloadParams = {
    locationID: string;
    locationName: string;
    year: string;
    items: string[];
    mode: DownloadMode;
};

type DownloadPopContextType = {
    isOpen: boolean;
    params: DownloadParams | null;
    open: (params: DownloadParams) => void;
    close: () => void;
};

const DownloadPopContext = createContext<DownloadPopContextType | undefined>(
    undefined
);

export const DownloadPopProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [params, setParams] = useState<DownloadParams | null>(null);

    const open = useCallback((params: DownloadParams) => {
        setParams(params);
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setParams(null);
    }, []);

    return (
        <DownloadPopContext.Provider value={{ isOpen, params, open, close }}>
            {children}
        </DownloadPopContext.Provider>
    );
};

export const useDownloadPop = (): DownloadPopContextType => {
    const ctx = useContext(DownloadPopContext);
    if (!ctx) {
        throw new Error("useDownloadPop 必須在 DownloadPopProvider 中使用");
    }
    return ctx;
};
