import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

// data
import LoginPic from "../assets/loginpic.png";

// components
import RegisterView from "./LoginItems/RegisterView";
import LoginView from "./LoginItems/LoginView";
import ForgotView from "./LoginItems/ForgotView";

interface LoginProps {
    isOpen: boolean;
    setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
}

type PopupView = "login" | "register" | "forgot";

const Login = ({ isOpen, setIsLoginOpen }: LoginProps) => {
    const [view, setView] = useState<PopupView>("login");
    return (
        <div
            className="login-pop"
            style={{ display: isOpen ? "block" : "none" }}
        >
            <div className="flex100">
                <div className="w_bgbox">
                    <div
                        className="xxx"
                        onClick={() => {
                            setIsLoginOpen(false);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            viewBox="0 0 50 50"
                        >
                            <path
                                id="Union_74"
                                data-name="Union 74"
                                d="M0,25A25,25,0,1,1,25,50,25,25,0,0,1,0,25ZM16.048,3.807A23.075,23.075,0,1,0,25,2,22.936,22.936,0,0,0,16.048,3.807Zm-.34,30.285a1,1,0,0,1,0-1.414L23.486,24.9l-7.778-7.778a1,1,0,0,1,1.414-1.414L24.9,23.486l7.779-7.778a1,1,0,0,1,1.414,1.414L26.313,24.9l7.779,7.779a1,1,0,0,1-1.414,1.414L24.9,26.313l-7.778,7.779a1,1,0,0,1-1.414,0Z"
                                fill="#1E5A24"
                            />
                        </svg>
                    </div>
                    <div className="leftpic">
                        <img src={LoginPic} />
                    </div>
                    <div className="right-content">
                        {/* 登入 */}
                        {view === "login" && (
                            <LoginView
                                setIsLoginOpen={setIsLoginOpen}
                                setView={setView}
                            />
                        )}

                        {/* 忘記密碼 */}
                        {view === "forgot" && (
                            <ForgotView
                                setIsLoginOpen={setIsLoginOpen}
                                setView={setView}
                            />
                        )}

                        {/* 註冊 */}
                        {view === "register" && (
                            <RegisterView setView={setView} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
