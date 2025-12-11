import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="contentbox">
            <div className="main-box">
                <h3 className="color-green">404</h3>
                <h3 className="color-green">找不到頁面</h3>
                <p className="color-green">
                    您所尋找的內容可能已被移除，或網址輸入錯誤。
                </p>

                <div className="actions-404">
                    <Link to="/" className="outline">
                        返回首頁
                    </Link>

                    <button
                        className="filled"
                        onClick={() => window.history.back()}
                    >
                        回上一頁
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
