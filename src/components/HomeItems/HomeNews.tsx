import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { API } from "../../config/api";

// types
import type { NewsItemType, CategoryType } from "../../types/item";

const HomeNews = () => {
    const prevRef = useRef<HTMLDivElement | null>(null);
    const nextRef = useRef<HTMLDivElement | null>(null);

    const [filteredNews, setFilteredNews] = useState<NewsItemType[]>([]);
    const [newsCategory, setNewsCategory] = useState<CategoryType[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>("all");

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function loadCategories() {
            try {
                const res = await fetch(API.news.category, { signal });
                const catData = await res.json();
                setNewsCategory(catData);
            } catch (err: any) {
                if (err.name === "AbortError") return;
                console.error(err);
            }
        }

        loadCategories();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function loadNews() {
            try {
                const res = await fetch(API.news.home(activeCategory), {
                    signal,
                });
                const json = await res.json();
                const list = Array.isArray(json) ? json : json.results ?? [];

                setFilteredNews(list);
            } catch (err: any) {
                if (err.name === "AbortError") return;
                console.error(err);
            }
        }

        loadNews();
        return () => controller.abort();
    }, [activeCategory]);

    return (
        <section className="s3-news">
            <div className="kubaill">
                <img src="/kubaill.svg" alt="" />
            </div>
            <div className="main-1600">
                <div className="left-mark">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="152.941"
                        viewBox="0 0 20 152.941"
                    >
                        <g
                            id="Group_8091"
                            data-name="Group 8091"
                            transform="translate(8139 -1290.529)"
                        >
                            <path
                                id="Union_68"
                                data-name="Union 68"
                                d="M16.971,154.183,2.858,145.715a2,2,0,0,1,0-3.431l14.113-8.467A2,2,0,0,1,20,135.533v16.934a2,2,0,0,1-2,2A1.981,1.981,0,0,1,16.971,154.183ZM0,108.468V91.533a2,2,0,0,1,3.029-1.715l14.112,8.468a2,2,0,0,1,0,3.43L3.029,110.183A2,2,0,0,1,0,108.468ZM17,65.277,3.015,57.234a2,2,0,0,1,0-3.468L17,45.724a2,2,0,0,1,3,1.733V63.543a2,2,0,0,1-3,1.734ZM0,20.468V3.533A2,2,0,0,1,3.029,1.817l14.112,8.468a2,2,0,0,1,0,3.43L3.029,22.182A2,2,0,0,1,0,20.468Z"
                                transform="translate(-8139 1289)"
                                fill="#333"
                            ></path>
                            <path
                                id="Union_70"
                                data-name="Union 70"
                                d="M17,109.277,3.015,101.234a2,2,0,0,1,0-3.468L17,89.723a2,2,0,0,1,3,1.734v16.086a2,2,0,0,1-3,1.734ZM0,63.543V47.457a2,2,0,0,1,3-1.733l13.988,8.042a2,2,0,0,1,0,3.468L3,65.277a2,2,0,0,1-3-1.734ZM17,21.277,3.015,13.234a2,2,0,0,1,0-3.468L17,1.724a2,2,0,0,1,3,1.733V19.543a2,2,0,0,1-3,1.734Z"
                                transform="translate(-8139 1305)"
                                fill="#eb6868"
                            ></path>
                            <path
                                id="Union_69"
                                data-name="Union 69"
                                d="M0,107.543V91.457a2,2,0,0,1,3-1.734l13.988,8.043a2,2,0,0,1,0,3.468L3,109.277a2,2,0,0,1-3-1.734ZM17,65.277,3.015,57.234a2,2,0,0,1,0-3.468L17,45.724a2,2,0,0,1,3,1.733V63.543a2,2,0,0,1-3,1.734ZM0,20.468V3.533A2,2,0,0,1,3.029,1.817l14.112,8.468a2,2,0,0,1,0,3.43L3.029,22.182A2,2,0,0,1,0,20.468Z"
                                transform="translate(-8139 1319)"
                                fill="#6db6f6"
                            ></path>
                        </g>
                    </svg>
                </div>

                <div className="left-title-filter">
                    <div className="index-title">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="133"
                            height="34"
                            viewBox="0 0 133 34"
                        >
                            <g
                                id="Group_7736"
                                data-name="Group 7736"
                                transform="translate(-6655 -518)"
                            >
                                <g
                                    id="Ellipse_2953"
                                    data-name="Ellipse 2953"
                                    transform="translate(6754 518)"
                                    fill="#73bf73"
                                    stroke="#654d26"
                                    strokeWidth="2"
                                >
                                    <circle
                                        cx="17"
                                        cy="17"
                                        r="17"
                                        stroke="none"
                                    ></circle>
                                    <circle
                                        cx="17"
                                        cy="17"
                                        r="16"
                                        fill="none"
                                    ></circle>
                                </g>
                                <g
                                    id="Ellipse_2957"
                                    data-name="Ellipse 2957"
                                    transform="translate(6655 518)"
                                    fill="#75a6ef"
                                    stroke="#654d26"
                                    strokeWidth="2"
                                >
                                    <circle
                                        cx="17"
                                        cy="17"
                                        r="17"
                                        stroke="none"
                                    ></circle>
                                    <circle
                                        cx="17"
                                        cy="17"
                                        r="16"
                                        fill="none"
                                    ></circle>
                                </g>
                                <g
                                    id="Ellipse_2956"
                                    data-name="Ellipse 2956"
                                    transform="translate(6680 518)"
                                    fill="#f66858"
                                    stroke="#654d26"
                                    strokeWidth="2"
                                >
                                    <circle
                                        cx="17"
                                        cy="17"
                                        r="17"
                                        stroke="none"
                                    ></circle>
                                    <circle
                                        cx="17"
                                        cy="17"
                                        r="16"
                                        fill="none"
                                    ></circle>
                                </g>
                                <g
                                    id="Ellipse_2954"
                                    data-name="Ellipse 2954"
                                    transform="translate(6729 518)"
                                    fill="#f5ce2b"
                                    stroke="#654d26"
                                    strokeWidth="2"
                                >
                                    <ellipse
                                        cx="17.5"
                                        cy="17"
                                        rx="17.5"
                                        ry="17"
                                        stroke="none"
                                    ></ellipse>
                                    <ellipse
                                        cx="17.5"
                                        cy="17"
                                        rx="16.5"
                                        ry="16"
                                        fill="none"
                                    ></ellipse>
                                </g>
                                <g
                                    id="Ellipse_2955"
                                    data-name="Ellipse 2955"
                                    transform="translate(6704 518)"
                                    fill="#fff"
                                    stroke="#654d26"
                                    strokeWidth="2"
                                >
                                    <circle
                                        cx="17"
                                        cy="17"
                                        r="17"
                                        stroke="none"
                                    ></circle>
                                    <circle
                                        cx="17"
                                        cy="17"
                                        r="16"
                                        fill="none"
                                    ></circle>
                                </g>
                            </g>
                        </svg>
                        <h2>NEWS</h2>
                    </div>
                    <ul className="news-filter">
                        <li
                            className={activeCategory === "all" ? "now" : ""}
                            onClick={() => setActiveCategory("all")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="17"
                                viewBox="0 0 15 17"
                            >
                                <path
                                    id="Polygon_86"
                                    data-name="Polygon 86"
                                    d="M6.76,3.071a2,2,0,0,1,3.48,0l5.068,8.943A2,2,0,0,1,13.568,15H3.432a2,2,0,0,1-1.74-2.986Z"
                                    transform="translate(15) rotate(90)"
                                    fill="#ffffff"
                                />
                            </svg>
                            <p>全部</p>
                        </li>
                        {newsCategory.map((category, index) => {
                            return (
                                <li
                                    key={index}
                                    className={
                                        activeCategory === category.key
                                            ? "now"
                                            : ""
                                    }
                                    onClick={() =>
                                        setActiveCategory(category.key)
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="15"
                                        height="17"
                                        viewBox="0 0 15 17"
                                    >
                                        <path
                                            id="Polygon_86"
                                            data-name="Polygon 86"
                                            d="M6.76,3.071a2,2,0,0,1,3.48,0l5.068,8.943A2,2,0,0,1,13.568,15H3.432a2,2,0,0,1-1.74-2.986Z"
                                            transform="translate(15) rotate(90)"
                                            fill="#ffffff"
                                        />
                                    </svg>
                                    <p>{category.name}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <div className="rightsw">
                <Swiper
                    modules={[Navigation]}
                    className="newsSwiper"
                    slidesPerView={1}
                    spaceBetween={20}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        // @ts-ignore
                        swiper.params.navigation.prevEl = prevRef.current;
                        // @ts-ignore
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                            slidesOffsetAfter: 500,
                        },
                        1024: {
                            slidesPerView: "auto",
                            spaceBetween: 30,
                            slidesOffsetAfter: 500,
                        },
                    }}
                >
                    {filteredNews.length === 0 ? (
                        <SwiperSlide>
                            <div className="no-news-slide">
                                尚無相關最新消息
                            </div>
                        </SwiperSlide>
                    ) : (
                        filteredNews.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Link to={`/news/${item.id}`}>
                                    <div className="imgbox">
                                        <img
                                            src={item.cover_image?.[0]?.image}
                                            alt=""
                                        />
                                    </div>

                                    <div className="topinf">
                                        {item.types_display.map(
                                            (type: string, index: number) => (
                                                <div
                                                    className="class-tag"
                                                    key={index}
                                                >
                                                    {type}
                                                </div>
                                            )
                                        )}
                                        <div className="date">{item.date}</div>
                                    </div>

                                    <h2>{item.title}</h2>
                                    <p>{item.content}</p>
                                </Link>
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>

            <div className="sw-btn-area">
                <div className="arrl sbtn" ref={prevRef}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="28"
                        viewBox="0 0 14 28"
                    >
                        <path
                            id="Union_69"
                            data-name="Union 69"
                            d="M12.265,27.679.288,14.7a1,1,0,0,1-.245-.41h0l-.006-.021v-.005l0-.018,0-.007,0-.015,0-.01,0-.013,0-.011,0-.012,0-.013,0-.011,0-.013v-.01l0-.014v-.082s0-.009,0-.013,0-.008,0-.011S0,14,0,14s0-.008,0-.012,0-.008,0-.011,0-.009,0-.013v-.082l0-.014v-.01l0-.013,0-.011,0-.013,0-.012,0-.011,0-.013,0-.01,0-.015,0-.007,0-.018v-.005l.006-.021h0a1,1,0,0,1,.245-.41L12.265.321a1,1,0,0,1,1.47,1.357L2.361,14,13.735,26.321a1,1,0,0,1-1.47,1.357Z"
                            fill="#654d26"
                        />
                    </svg>
                </div>
                <div className="arrr sbtn" ref={nextRef}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="28"
                        viewBox="0 0 14 28"
                    >
                        <path
                            id="Union_70"
                            data-name="Union 70"
                            d="M12.265.321.288,13.3a1,1,0,0,0-.245.41h0l-.006.021v.005l0,.018,0,.007,0,.015,0,.01,0,.013,0,.011,0,.012,0,.013,0,.011,0,.013v.01l0,.014v.082s0,.009,0,.013,0,.008,0,.011S0,14,0,14s0,.008,0,.012,0,.008,0,.011,0,.009,0,.013v.082l0,.014v.01l0,.013,0,.011,0,.013,0,.012,0,.011,0,.013,0,.01,0,.015,0,.007,0,.018v.005l.006.021h0a1,1,0,0,0,.245.41L12.265,27.679a1,1,0,0,0,1.47-1.357L2.361,14,13.735,1.679A1,1,0,0,0,12.265.321Z"
                            transform="translate(14 28) rotate(180)"
                            fill="#654d26"
                        />
                    </svg>
                </div>
                <Link to="/news/" className="btn-linkto">
                    <p>了解更多</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="31.001"
                        height="9.001"
                        viewBox="0 0 31.001 9.001"
                    >
                        <path
                            id="Union_71"
                            data-name="Union 71"
                            d="M9050.5-487h-30a.5.5,0,0,1-.5-.5.5.5,0,0,1,.5-.5h28.793l-7.146-7.146a.5.5,0,0,1,0-.706.5.5,0,0,1,.706,0l7.993,7.993a.465.465,0,0,1,.04.043.5.5,0,0,1-.033.67h0a.5.5,0,0,1-.234.133h0l-.023.005h0l-.022,0h-.006l-.018,0h-.049Z"
                            transform="translate(-9020 496)"
                            fill="#fff"
                        />
                    </svg>
                </Link>
            </div>

            <div className="montbg">
                <img src="/montbg3.png" alt="" />
            </div>
        </section>
    );
};

export default HomeNews;
