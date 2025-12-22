import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useLayoutEffect, useState } from "react";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About.tsx";
import Login from "./components/Login.tsx";
import DownloadPop from "./components/DownloadPop.tsx";
import RequireAuth from "./components/RequireAuth.tsx";

// dashboard items
import User from "./components/DashboardItems/User.tsx";
import Download from "./components/DashboardItems/Download.tsx";

// pages
import Home from "./pages/Home.tsx";
import News from "./pages/News.tsx";
import NewsDetail from "./pages/NewsDetail.tsx";
import Contact from "./pages/Contact.tsx";
import Faq from "./pages/Faq.tsx";
import Literature from "./pages/Literature.tsx";
import CouEvent from "./pages/CouEvent.tsx";
import Observation from "./pages/Observation.tsx";
import EcologicalEconomics from "./pages/EcologicalEconomics.tsx";
import EcologicalCultrue from "./pages/EcologicalCultrue.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ResetPsw from "./pages/ResetPsw.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfUse from "./pages/TermsOfUse.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

function App() {
    const [offset, setOffset] = useState(0);
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const location = useLocation();

    useLayoutEffect(() => {
        const el = document.querySelector("header");
        if (!el) return;
        const update = () =>
            setOffset((el as HTMLElement).getBoundingClientRect().height);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const isHome = location.pathname === "/";

    return (
        <>
            <Login isOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />
            <Header setIsLoginOpen={setIsLoginOpen} />
            <DownloadPop />

            <main style={{ paddingTop: isHome ? 0 : offset }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/about/:path" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/literature" element={<Literature />} />
                    <Route path="/cou/event" element={<CouEvent />} />
                    <Route
                        path="/observation/ecological-economics"
                        element={<EcologicalEconomics />}
                    />
                    <Route
                        path="/observation/ecological-culture/:item?"
                        element={<EcologicalCultrue />}
                    />
                    <Route
                        path="/observation/:path/:item?"
                        element={<Observation />}
                    />
                    <Route
                        path="/dashboard"
                        element={<Navigate to="/dashboard/user" replace />}
                    />
                    <Route
                        path="/dashboard/user"
                        element={
                            <RequireAuth>
                                <Dashboard content={<User />} />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/dashboard/download"
                        element={
                            <RequireAuth>
                                <Dashboard content={<Download />} />
                            </RequireAuth>
                        }
                    />
                    <Route path="/news/:id" element={<NewsDetail />} />
                    <Route path="/reset-password" element={<ResetPsw />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-use" element={<TermsOfUse />} />

                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
