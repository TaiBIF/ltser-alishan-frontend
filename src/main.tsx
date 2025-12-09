import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/select2.min.css";
import "./styles/theme.css";
import "./styles/sass/theme.scss";
import "leaflet/dist/leaflet.css";
import App from "./App.tsx";

// context
import { AuthProvider } from "./context/AuthContext.tsx";
import { DownloadPopProvider } from "./context/DownloadPopContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <DownloadPopProvider>
                    <App />
                </DownloadPopProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
