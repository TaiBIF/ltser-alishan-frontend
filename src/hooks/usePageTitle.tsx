import { useEffect } from "react";

const SITE_SUFFIX = "｜長期社會生態核心觀測站 阿里山站";

export const usePageTitle = (title?: string) => {
    useEffect(() => {
        if (!title) return;

        document.title = `${title}${SITE_SUFFIX}`;
    }, [title]);
};
