import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// components
import HomeNews from "../components/HomeItems/HomeNews";
import SurveyMap from "../components/HomeItems/SurveyMap";
import HomeBanner from "../components/HomeItems/HomeBanner";
import HomeIntroduction from "../components/HomeItems/HomeIntroduction";
import JoinUs from "../components/HomeItems/JoinUs";

const Home = () => {
    const homeRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // ===== s2-about parallax (t2) =====
            const t2 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".s2-about",
                    start: "0 top",
                    scrub: 3,
                },
            });
            t2.to(".s2-about .montbg", { y: -20 });

            // s2-about 進場加 vivi
            ScrollTrigger.create({
                trigger: ".s2-about",
                start: "-400 top",
                onEnter: () => {
                    document.querySelector(".s2-about")?.classList.add("vivi");
                },
            });

            // ===== s3-news 背景 parallax =====
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".s3-news",
                    start: "0 top",
                    end: "bottom top",
                    scrub: 3,
                },
            }).to(".s3-news .montbg", { y: -20 }, 0);

            // ===== left-mark 移動 =====
            gsap.to(".s3-news .left-mark", {
                y: 700,
                scrollTrigger: {
                    trigger: ".s3-news",
                    start: "top bottom",
                    end: "+=800",
                    scrub: 3,
                },
            });

            // s3-news 進場加 vivi
            ScrollTrigger.create({
                trigger: ".s3-news",
                start: "-400 top",
                onEnter: () => {
                    document.querySelector(".s3-news")?.classList.add("vivi");
                },
            });

            // ===== s4-sumap parallax (t4) =====
            const t4 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".s5-join",
                    start: "-600 top",
                    scrub: 3,
                },
            });
            t4.to(".s4-sumap .montbg", { y: 20 }, 0);
            t4.to(".s5-join .tree img", { y: -50 }, 0);

            // s4-sumap 進場加 vivi
            ScrollTrigger.create({
                trigger: ".s4-sumap",
                start: "-400 top",

                onEnter: function () {
                    document.querySelector(".s4-sumap")?.classList.add("vivi");
                },
            });

            // s5-join 進場加 vivi
            ScrollTrigger.create({
                trigger: ".s5-join",
                start: "-500 top",
                onEnter: function () {
                    document.querySelector(".s5-join")?.classList.add("vivi");
                },
            });
        }, homeRef); // 讓 selector 限縮在這個區塊

        return () => ctx.revert(); // 清掉 timeline & ScrollTrigger
    }, []);

    return (
        <div className="ovh" ref={homeRef}>
            {/* 首圖 */}
            <HomeBanner />

            {/* 介紹 */}
            <HomeIntroduction />

            {/* 最新消息 */}
            <HomeNews />

            {/* 地圖 */}
            <SurveyMap />

            {/* 加入我們 */}
            <JoinUs />
        </div>
    );
};

export default Home;
