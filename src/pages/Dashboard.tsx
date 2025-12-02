import { Link, useLocation } from "react-router-dom";

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
    // {
    //     id: "introduction",
    //     title: "關於 LTSER 阿里山",
    //     auth: ["superuser", "social_project_staff", "staff", "none"],
    // },
    // {
    //     id: "cou",
    //     title: "鄒族記事",
    //     auth: ["superuser", "social_project_staff", "staff", "none"],
    // },
    // {
    //     id: "news",
    //     title: "最新消息",
    //     auth: ["superuser", "social_project_staff", "staff", "none"],
    // },
    // {
    //     id: "literature",
    //     title: "相關文獻",
    //     auth: ["superuser", "social_project_staff", "staff", "none"],
    // },
    // {
    //     id: "qa",
    //     title: "常見 Q&A",
    //     auth: ["superuser", "social_project_staff", "staff", "none"],
    // },
    // {
    //     id: "download-record",
    //     title: "下載資料紀錄",
    //     auth: ["superuser", "social_project_staff", "staff", "none"],
    // },
    // {
    //     id: "download",
    //     title: "資料下載申請資訊",
    //     auth: ["superuser", "social_project_staff", "staff"],
    // },
];

interface DashboarProps {
    content: React.ReactNode;
}

const Dashboard = ({ content }: DashboarProps) => {
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
