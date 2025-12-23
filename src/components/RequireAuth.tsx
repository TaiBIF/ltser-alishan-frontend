import { Navigate, useLocation } from "react-router-dom";

// context
import { useAuth } from "../context/AuthContext";

// helpers
import { swalToast } from "../helpers/CustomSwal";

interface RequireAuthProps {
    children: React.ReactNode;
    staffOnly?: boolean;
}

const RequireAuth = ({ children, staffOnly = false }: RequireAuthProps) => {
    const { isLoggedIn, isStaff, isReady } = useAuth();
    const location = useLocation();

    if (!isReady) return null;

    if (!isLoggedIn) {
        // 彈出提醒
        swalToast.fire({
            icon: "error",
            title: "需要登入才能取得瀏覽權限",
        });

        // 導回首頁或其他頁面
        return <Navigate to="/" replace state={{ from: location.pathname }} />;
    }

    if (staffOnly && !isStaff) {
        return <Navigate to="/" replace state={{ from: location.pathname }} />;
    }

    return children;
};

export default RequireAuth;
