import { useEffect, useState, useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import { API } from "../config/api";

// context
import { useAuth } from "../context/AuthContext";

// types
import type { AboutApiItemType } from "../types/item";

// animation
import { gsapSlideToggle } from "../utils/animation";

interface HeaderProps {
    setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ setIsLoginOpen }: HeaderProps) => {
    const { isLoggedIn, logout, isStaff, authReady } = useAuth();
    const [items, setItems] = useState<AboutApiItemType[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(
        typeof window !== "undefined" ? window.innerWidth >= 1279 : false
    );
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
    const [openTitleBox, setOpenTitleBox] = useState<string | null>(null);

    // === for animation ===
    const mainMenuRef = useRef<HTMLDivElement | null>(null);
    const aboutMegaRef = useRef<HTMLDivElement | null>(null);
    const observationMenuRef = useRef<HTMLDivElement | null>(null);
    const couMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(API.introduction.all);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setItems(data);
            } catch (err) {
                console.error("Failed to fetch introduction data:", err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const nowDesktop = window.innerWidth >= 1279;
            setIsDesktop(nowDesktop);

            if (nowDesktop) {
                // 桌機：menu 固定打開
                setIsMenuOpen(true);
                setOpenSubMenu(null);
                setOpenTitleBox(null);
            } else {
                // 手機：預設全部收起
                setIsMenuOpen(false);
                setOpenSubMenu(null);
                setOpenTitleBox(null);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // === main menu 動畫（整個主選單）===
    useEffect(() => {
        const el = mainMenuRef.current;
        if (!el) return;

        if (isDesktop) {
            // 桌機直接展開，不做動畫
            el.style.display = "flex";
            el.style.height = "auto";
            return;
        }

        gsapSlideToggle("auto", el, isMenuOpen);
    }, [isMenuOpen, isDesktop]);

    // === 關於 LTSER mega menu 動畫 ===
    useEffect(() => {
        const el = aboutMegaRef.current;
        if (!el) return;

        if (isDesktop) {
            el.style.display = "block";
            el.style.height = "auto";
            return;
        }

        const isOpen = openSubMenu === "about";
        gsapSlideToggle("auto", el, isOpen);
    }, [openSubMenu, isDesktop]);

    // === 觀測站資料 二層選單 動畫 ===
    useEffect(() => {
        const el = observationMenuRef.current;
        if (!el) return;

        if (isDesktop) {
            el.style.display = "block";
            el.style.height = "auto";
            return;
        }

        const isOpen = openSubMenu === "observation";
        gsapSlideToggle("auto", el, isOpen);
    }, [openSubMenu, isDesktop]);

    // === 鄒族記事 二層選單 動畫 ===
    useEffect(() => {
        const el = couMenuRef.current;
        if (!el) return;

        if (isDesktop) {
            el.style.display = "block";
            el.style.height = "auto";
            return;
        }

        const isOpen = openSubMenu === "cou";
        gsapSlideToggle("auto", el, isOpen);
    }, [openSubMenu, isDesktop]);

    const handleTopMenuClick = (key: string) => {
        if (isDesktop) return; // 桌機不走 click 開合

        setOpenSubMenu((prev) => (prev === key ? null : key));
    };

    const handleTitleBoxClick = (key: string) => {
        if (isDesktop) return;
        setOpenTitleBox((prev) => (prev === key ? null : key));
    };

    const handleHamburgerClick = () => {
        if (window.innerWidth < 1279) {
            setIsMenuOpen((prev) => !prev);
        } else {
            setIsMenuOpen(true);
        }
    };

    const ecology = items.filter((i) => i.type === "ecology");
    const environment = items.filter((i) => i.type === "environment");
    const ecoEconomics = items.filter((i) => i.type === "ecological-economics");
    const ecoCulture = items.filter((i) => i.type === "ecological-culture");

    return (
        <header className="scrollhd">
            <div className="mb-hambruger">
                <svg
                    className={
                        "ham hamRotate ham4" +
                        (isMenuOpen && !isDesktop ? " active" : "")
                    }
                    viewBox="0 0 100 100"
                    width="60"
                    onClick={handleHamburgerClick}
                >
                    <path
                        className="line top"
                        d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
                    />
                    <path className="line middle" d="m 70,50 h -40" />
                    <path
                        className="line bottom"
                        d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
                    />
                </svg>
            </div>
            <div className="flex-box">
                <a href="/" className="logo">
                    <img src="/logo.png" alt="長期社會生態核心觀測-原民站" />
                    <div className="logo-txt">
                        <span>LTSER INDEGENOUS - Alishan</span>
                        <h1>長期社會生態核心觀測 阿里山站</h1>
                    </div>
                </a>
                <div
                    ref={mainMenuRef}
                    className={`main_menu u-slide-toggle ${
                        isDesktop || isMenuOpen ? "open" : ""
                    }`}
                >
                    <ul>
                        <li>
                            <a
                                href="#"
                                className={
                                    "big_title" +
                                    (!isDesktop && openSubMenu === "about"
                                        ? " now"
                                        : "")
                                }
                                onClick={() => handleTopMenuClick("about")}
                            >
                                關於LTSER_阿里山
                                <span></span>
                            </a>
                            <div
                                ref={aboutMegaRef}
                                className={
                                    "menu_mega u-slide-toggle" +
                                    (isDesktop || openSubMenu === "about"
                                        ? " open"
                                        : "")
                                }
                            >
                                <div className="w_bg">
                                    <div className="main-1240">
                                        <div className="item-set1">
                                            <div
                                                className={
                                                    "titlebox" +
                                                    (isDesktop ||
                                                    openTitleBox === "ecology"
                                                        ? " now"
                                                        : "")
                                                }
                                                onClick={() =>
                                                    handleTitleBoxClick(
                                                        "ecology"
                                                    )
                                                }
                                            >
                                                生態觀測
                                                <div className="mark"></div>
                                            </div>
                                            {ecology.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={
                                                        "itembox" +
                                                        (isDesktop ||
                                                        openTitleBox ===
                                                            "ecology"
                                                            ? " open"
                                                            : "")
                                                    }
                                                >
                                                    <a
                                                        href={`/about/${item.name_en}`}
                                                    >
                                                        {item.name}
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="item-set1">
                                            <div
                                                className={
                                                    "titlebox" +
                                                    (isDesktop ||
                                                    openTitleBox ===
                                                        "environment"
                                                        ? " now"
                                                        : "")
                                                }
                                                onClick={() =>
                                                    handleTitleBoxClick(
                                                        "environment"
                                                    )
                                                }
                                            >
                                                環境觀測
                                                <div className="mark"></div>
                                            </div>

                                            {environment.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={
                                                        "itembox" +
                                                        (isDesktop ||
                                                        openTitleBox ===
                                                            "environment"
                                                            ? " open"
                                                            : "")
                                                    }
                                                >
                                                    <a
                                                        href={`/about/${item.name_en}`}
                                                    >
                                                        {item.name}
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="item-set1">
                                            <div
                                                className={
                                                    "titlebox" +
                                                    (isDesktop ||
                                                    openTitleBox === "economic"
                                                        ? " now"
                                                        : "")
                                                }
                                                onClick={() =>
                                                    handleTitleBoxClick(
                                                        "economic"
                                                    )
                                                }
                                            >
                                                生態經濟
                                                <div className="mark"></div>
                                            </div>

                                            {ecoEconomics.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={
                                                        "itembox" +
                                                        (isDesktop ||
                                                        openTitleBox ===
                                                            "economic"
                                                            ? " open"
                                                            : "")
                                                    }
                                                >
                                                    <a
                                                        href={`/about/${item.name_en}`}
                                                    >
                                                        {item.name}
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="item-set1">
                                            <div
                                                className={
                                                    "titlebox" +
                                                    (isDesktop ||
                                                    openTitleBox === "culture"
                                                        ? " now"
                                                        : "")
                                                }
                                                onClick={() =>
                                                    handleTitleBoxClick(
                                                        "culture"
                                                    )
                                                }
                                            >
                                                經濟與文化面向
                                                <div className="mark"></div>
                                            </div>

                                            {ecoCulture.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={
                                                        "itembox" +
                                                        (isDesktop ||
                                                        openTitleBox ===
                                                            "culture"
                                                            ? " open"
                                                            : "")
                                                    }
                                                >
                                                    <a
                                                        href={`/about/${item.name_en}`}
                                                    >
                                                        {item.name}
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="secmenu">
                            <p
                                className={
                                    "big_title" +
                                    (!isDesktop && openSubMenu === "observation"
                                        ? " now"
                                        : "")
                                }
                                onClick={() =>
                                    handleTopMenuClick("observation")
                                }
                            >
                                觀測站資料
                                <span></span>
                            </p>
                            <div
                                ref={observationMenuRef}
                                className={
                                    "menu_2 u-slide-toggle" +
                                    (isDesktop || openSubMenu === "observation"
                                        ? " open"
                                        : "")
                                }
                            >
                                <div className="w_bg">
                                    <a href="/observation/ecology">生態觀測</a>
                                    <a href="/observation/environment">
                                        環境觀測
                                    </a>
                                    <a href="/observation/ecological-economics">
                                        生態經濟
                                    </a>
                                    <a href="/observation/ecological-culture">
                                        經濟與文化面向
                                    </a>
                                </div>
                            </div>
                        </li>
                        <li className="secmenu">
                            <p
                                className={
                                    "big_title" +
                                    (!isDesktop && openSubMenu === "cou"
                                        ? " now"
                                        : "")
                                }
                                onClick={() => handleTopMenuClick("cou")}
                            >
                                鄒族記事
                                <span></span>
                            </p>
                            <div
                                ref={couMenuRef}
                                className={
                                    "menu_2 u-slide-toggle" +
                                    (isDesktop || openSubMenu === "cou"
                                        ? " open"
                                        : "")
                                }
                            >
                                <div className="w_bg">
                                    <a href="/cou/event">重要活動紀錄</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <a href="/news" className="big_title">
                                最新消息
                                <span></span>
                            </a>
                        </li>
                        <li>
                            <a href="/literature" className="big_title">
                                相關文獻
                                <span></span>
                            </a>
                        </li>
                        <li>
                            <a href="/faq" className="big_title">
                                常見Q&A
                                <span></span>
                            </a>
                        </li>
                        {isLoggedIn && isStaff && (
                            <li>
                                <a href="/form-link" className="big_title">
                                    常用表單與連結
                                    <span></span>
                                </a>
                            </li>
                        )}
                    </ul>
                    <div className="header-iconbox">
                        <div className="lang">
                            <div className="iconcir">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28.5"
                                    height="28.502"
                                    viewBox="0 0 28.5 28.502"
                                >
                                    <path
                                        id="Union_68"
                                        data-name="Union 68"
                                        d="M13.344,28.5l-.029-.007c-.023-.005-.046-.013-.068-.019a.491.491,0,0,0-.073-.018,13.779,13.779,0,0,1-6.734-2.3A14.117,14.117,0,0,1,.219,16.711C.153,16.357.108,16,.065,15.647Q.035,15.4,0,15.163l0-.034,0-1.78c.013-.1.025-.209.037-.314.026-.226.052-.46.086-.691A14.025,14.025,0,0,1,5.568,2.979,13.713,13.713,0,0,1,14.1,0a15.549,15.549,0,0,1,2.463.2,13.787,13.787,0,0,1,9.064,5.5A13.86,13.86,0,0,1,28.37,16.149a13.786,13.786,0,0,1-3.5,7.582,14.064,14.064,0,0,1-8.141,4.549c-.36.066-.726.112-1.081.156-.165.021-.328.041-.493.064l-.016,0ZM2,18.245a12.718,12.718,0,0,0,6.018,7.261,12.57,12.57,0,0,0,6.208,1.631,13.057,13.057,0,0,0,5.319-1.146A11.979,11.979,0,0,0,23.3,23.369a1.532,1.532,0,0,1-1-.577,1.515,1.515,0,0,1-.17-1.315,7.008,7.008,0,0,0,.156-1.524c0-.087.005-.175.009-.262a12.524,12.524,0,0,0-.049-1.526,12.131,12.131,0,0,0-.2-1.424.472.472,0,0,0-.473-.4c-.238-.021-.485-.031-.723-.041l-.3-.013a3.48,3.48,0,0,1-2.309-.77,2.363,2.363,0,0,1-.551-3.344c.079-.136.162-.271.242-.4.1-.158.2-.323.291-.486a.5.5,0,0,0,.068-.427.923.923,0,0,1,.04-.59,1.979,1.979,0,0,1,1.031-1.118,1.369,1.369,0,0,1,.543-.12.917.917,0,0,1,.221.025,13.239,13.239,0,0,0,3.1.286h.287a.329.329,0,0,0,.247-.1.544.544,0,0,0,.122-.4c0-.065-.005-.187-.323-.187l-.054,0c-.129.006-.257.02-.393.034s-.28.03-.423.036l-.075,0c-.71.032-1.444.067-2.168.081H20.42a.912.912,0,0,1-.941-.749l-.026-.113a5.55,5.55,0,0,1-.176-1.143,2.4,2.4,0,0,1,1.437-2.36c.308-.144.626-.271.932-.4l.285-.115a12.771,12.771,0,0,0-7.706-2.559A12.311,12.311,0,0,0,8.346,2.832a2.856,2.856,0,0,0,.965.184,2.169,2.169,0,0,0,.548-.069c.169-.044.34-.077.506-.109.131-.026.257-.05.381-.079A5.054,5.054,0,0,1,11.9,2.61a2.881,2.881,0,0,1,2.088.835,1.522,1.522,0,0,0,.586.259l.1.03a4.008,4.008,0,0,0,.451.1,4.552,4.552,0,0,1,.478.1,1.414,1.414,0,0,1,1.092,1.346,4.9,4.9,0,0,1-.275,1.98,1.452,1.452,0,0,1-1.142,1.01c-.066.013-.132.029-.2.046-.091.022-.185.044-.283.061a7.927,7.927,0,0,0-2.514.951,1.331,1.331,0,0,0-.762.913,1.767,1.767,0,0,1-1.49,1.46c-.272.061-.547.11-.814.157-.211.037-.427.076-.638.12a1.22,1.22,0,0,0-.172.046,1.09,1.09,0,0,0,.07.152c.1.2.221.382.346.579s.265.418.382.642a.629.629,0,0,0,.634.39,1.686,1.686,0,0,0,.221-.015,8.736,8.736,0,0,1,1.085-.086,3.693,3.693,0,0,1,.611.046,10.875,10.875,0,0,1,3.382,1.2,8.19,8.19,0,0,1,1.322.9A2,2,0,0,1,17.17,17.8a5.127,5.127,0,0,1-.913,2.265c-.258.347-.534.687-.8,1.016-.146.18-.3.367-.443.552a3.313,3.313,0,0,0-.73,1.681,6.328,6.328,0,0,1-.124.727,3.854,3.854,0,0,1-1.009,2.032,1.363,1.363,0,0,1-.933.4,1.29,1.29,0,0,1-.951-.447,2.765,2.765,0,0,1-.622-.976,22.693,22.693,0,0,1-.676-2.468,4.111,4.111,0,0,0-1.789-3.054,2.029,2.029,0,0,1-.946-1.448,15.094,15.094,0,0,1-.212-1.844,2.132,2.132,0,0,0-.809-1.617,5.68,5.68,0,0,0-.716-.477,8.64,8.64,0,0,1-2.756-2.449c-.27-.381-.509-.782-.742-1.17-.013-.022-.025-.044-.039-.066A12.609,12.609,0,0,0,2,18.245ZM6.756,3.805a12.7,12.7,0,0,0-4.05,4.77.236.236,0,0,0-.013.131,7.683,7.683,0,0,0,3.491,4.243,8.071,8.071,0,0,1,.783.5A3.293,3.293,0,0,1,8.349,15.7c.041.3.053.6.064.9,0,.132.01.269.017.4a1.893,1.893,0,0,0,.931,1.711,3.24,3.24,0,0,1,1.454,1.879c.2.631.356,1.283.506,1.913q.053.225.107.45l.046.191a5.455,5.455,0,0,0,.644,1.778.7.7,0,0,0,.123.151.577.577,0,0,0,.082-.129,5.037,5.037,0,0,0,.517-1.4,5.657,5.657,0,0,1,1.189-2.887c.13-.153.262-.312.389-.465.074-.089.147-.179.221-.267a4.69,4.69,0,0,0,1.02-1.7c.283-1.027.313-1.134-.619-1.758a10.926,10.926,0,0,0-3.216-1.336,2.769,2.769,0,0,0-1.167-.06c-.216.03-.435.05-.647.071l-.283.028H9.717a1.635,1.635,0,0,1-1.525-.787,17.589,17.589,0,0,1-1.022-1.771,1.534,1.534,0,0,1-.126-.86,1.4,1.4,0,0,1,1.249-1.127c.288-.065.582-.117.866-.167.211-.037.428-.076.64-.119a.432.432,0,0,0,.373-.388,2.519,2.519,0,0,1,1.145-1.643A8.9,8.9,0,0,1,14.151,7.12c.123-.028.247-.052.366-.076s.274-.053.406-.084a.338.338,0,0,0,.278-.29c.056-.268.119-.572.164-.872a.663.663,0,0,0-.04-.474.619.619,0,0,0-.418-.152,3.76,3.76,0,0,1-2.181-.95,1.021,1.021,0,0,0-.847-.236L11.789,4a9.62,9.62,0,0,0-1.143.2,5.465,5.465,0,0,1-1.37.185,4.057,4.057,0,0,1-1.759-.387,2.814,2.814,0,0,0-.593-.2.336.336,0,0,0-.069-.006A.241.241,0,0,0,6.756,3.805Zm12.9,6.841a2.241,2.241,0,0,1-.43,1.652l-.133.223c-.133.223-.272.454-.391.685a.71.71,0,0,0-.049.667,1.59,1.59,0,0,0,1.121.944,8.425,8.425,0,0,0,1.11.1c.143.006.292.013.438.022a1.985,1.985,0,0,1,1.708.781,2.764,2.764,0,0,1,.474,1.211c.013.148.027.3.041.442a13.718,13.718,0,0,1-.094,4.582c0,.017-.006.03-.008.04a.156.156,0,0,0,.025.009.863.863,0,0,0,.258.034,1.525,1.525,0,0,0,1.147-.518,12.754,12.754,0,0,0,2.255-7.169,12.845,12.845,0,0,0-3.9-9.308.562.562,0,0,0-.07-.058c-.632.246-1.356.533-2.05.844a.77.77,0,0,0-.417.726,2.345,2.345,0,0,0,0,.515c.016.1.028.193.038.265.007.056.015.116.023.159h.014c.059,0,.139-.005.243-.012l.161-.01c.366-.022.74-.053,1.1-.084.4-.034.809-.069,1.216-.09A1.611,1.611,0,0,1,25.2,8.4a2.1,2.1,0,0,1-.8,2.145,1.148,1.148,0,0,1-.464.144c-.367.029-.74.044-1.108.044a14.356,14.356,0,0,1-2.848-.29h0A.48.48,0,0,0,19.656,10.646Z"
                                        fill="#1F5B26"
                                    />
                                </svg>
                            </div>
                            <p>選擇語系</p>
                            <div className="menu_2">
                                <div className="w_bg">
                                    <a href="#">English</a>
                                    <a href="#">繁體中文</a>
                                </div>
                            </div>
                        </div>
                        <a href="/contact" className="contact">
                            <div className="iconcir">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="29"
                                    height="20.306"
                                    viewBox="0 0 29 20.306"
                                >
                                    <path
                                        id="Path_23"
                                        data-name="Path 23"
                                        d="M53.92,38.52H30.3a2.693,2.693,0,0,0-2.69,2.69V56.136a2.7,2.7,0,0,0,2.69,2.69H53.92a2.7,2.7,0,0,0,2.69-2.69V41.21A2.693,2.693,0,0,0,53.92,38.52Zm1.244,17.956-7.382-6.887L55.215,43.8C55.194,56.863,55.262,56.118,55.165,56.476ZM42.11,52.244l-13.1-10.215v-.818a1.3,1.3,0,0,1,1.295-1.3H53.919a1.3,1.3,0,0,1,1.3,1.3v.818ZM29,43.8l7.432,5.792-7.382,6.887c-.1-.359-.029.377-.051-12.68ZM30.1,57.412l7.454-6.953,4.13,3.22a.7.7,0,0,0,.857,0l4.13-3.22,7.454,6.953c-.192.03-23.86.027-24.026,0Z"
                                        transform="translate(-27.61 -38.52)"
                                        fill="#1F5B26"
                                    />
                                </svg>
                            </div>
                            <p>聯絡我們</p>
                        </a>
                        <div
                            className="loginbox"
                            onClick={() => {
                                if (!isLoggedIn) {
                                    setIsLoginOpen(true);
                                }
                            }}
                        >
                            <div className="formb">
                                <div className="iconcir">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="21.06"
                                        height="24.43"
                                        viewBox="0 0 21.06 24.43"
                                    >
                                        <path
                                            id="Union_68"
                                            data-name="Union 68"
                                            d="M10.53,23.2C4.714,23.2,0,26.866,0,21.546s4.714-9.632,10.53-9.632,10.53,4.313,10.53,9.632c0,2.235-.833,2.883-2.229,2.883C16.9,24.43,13.9,23.2,10.53,23.2Zm5.6-.719a14.663,14.663,0,0,0,2.705.453.921.921,0,0,0,.5-.085c.023-.027.224-.288.224-1.3,0-4.484-4.051-8.132-9.03-8.132S1.5,17.062,1.5,21.546c0,1.01.2,1.272.224,1.3a.918.918,0,0,0,.5.085,14.643,14.643,0,0,0,2.7-.453,25.5,25.5,0,0,1,5.6-.781A25.5,25.5,0,0,1,16.125,22.477ZM5,5a5,5,0,1,1,5,5A5,5,0,0,1,5,5ZM6.5,5A3.5,3.5,0,1,0,10,1.5,3.5,3.5,0,0,0,6.5,5Z"
                                            fill="#1F5B26"
                                        />
                                    </svg>
                                </div>
                                <p>登入</p>
                            </div>
                            <div className="menu_2">
                                <div className="w_bg">
                                    {isLoggedIn ? (
                                        <>
                                            <a href="/dashboard">後台</a>
                                            <a
                                                href="/"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    logout();
                                                }}
                                            >
                                                登出
                                            </a>
                                        </>
                                    ) : (
                                        <a
                                            onClick={() => {
                                                setIsLoginOpen(true);
                                            }}
                                        >
                                            登入
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
