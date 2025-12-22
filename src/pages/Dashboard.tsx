import { Link, useLocation } from "react-router-dom";

// hooks
import { usePageTitle } from "../hooks/usePageTitle";

export type TabItem = {
    id: string;
    title: string;
    auth?: string[];
};

const dashboardItemList: TabItem[] = [
    {
        id: "user",
        title: "個人帳號管理",
        auth: ["superuser", "social_project_staff", "staff", "none"],
    },
    {
        id: "download",
        title: "申請下載資料紀錄",
        auth: ["superuser", "social_project_staff", "staff", "none"],
    },
];

interface DashboarProps {
    content: React.ReactNode;
}

const Dashboard = ({ content }: DashboarProps) => {
    usePageTitle("後台");
    const { pathname } = useLocation();
    const paths = pathname.split("/");
    return (
        <>
            <main className="u-page dashboard-inherit">
                <div className="container u-container">
                    <div className="row gx-5 u-container">
                        <div className="col-3 pe-4">
                            <div className="c-tabs">
                                {dashboardItemList.map((d) => {
                                    return (
                                        <Link
                                            key={d.id}
                                            className={`c-tabs__btn ${
                                                paths.includes(d.id) ||
                                                (paths.includes("user") &&
                                                    d.id === "user")
                                                    ? "active"
                                                    : ""
                                            }`}
                                            to={`/dashboard/${d.id}`}
                                        >
                                            {d.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="u-main">{content}</div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Dashboard;
