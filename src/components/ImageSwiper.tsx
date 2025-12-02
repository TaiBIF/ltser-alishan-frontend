import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ImageItem = { id?: number; image: string };
type Props = { data: ImageItem[] | undefined };

const ImageSwiper = ({ data }: Props) => {
    const slides = Array.isArray(data) ? data : [];
    if (slides.length === 0) return null;

    const enableLoop = slides.length > 1;

    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            pagination={enableLoop ? { clickable: true } : false}
            navigation={enableLoop}
            loop={enableLoop} // 只有多於 1 張圖才啟用
            modules={[Navigation, Pagination]}
            style={{ width: "100%", maxWidth: "800px", marginTop: "20px" }}
        >
            {slides.map((item, i) => (
                <SwiperSlide
                    key={item.id ?? i}
                    className="d-flex justify-content-center"
                >
                    <img
                        className="e-img e-img--cover slide-img-4x3"
                        src={item.image}
                        alt="slide"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ImageSwiper;
