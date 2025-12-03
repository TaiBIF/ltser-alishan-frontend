import { useState } from "react";
import { PicPop } from "./PicPop";

type ImagePopProps = {
    thumbSrc: string; // 縮圖（受 CSS 控制大小）
    fullSrc?: string; // 原圖，不給就用 thumbSrc
    alt?: string;
};

export function ImagePop({ thumbSrc, fullSrc, alt = "" }: ImagePopProps) {
    const [open, setOpen] = useState(false);
    const big = fullSrc ?? thumbSrc;

    return (
        <>
            <div
                className="img-sbox"
                onClick={() => setOpen(true)}
                style={{ cursor: "zoom-in" }}
            >
                <img src={thumbSrc} alt={alt} />
            </div>
            <PicPop
                open={open}
                src={big}
                alt={alt}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
