import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // 每次路由變更就回到頂端
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
