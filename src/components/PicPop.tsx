import React from "react";
import ReactDOM from "react-dom";

type PicPopProps = {
    open: boolean;
    src: string;
    alt?: string;
    onClose: () => void;
};

export function PicPop({ open, src, alt = "", onClose }: PicPopProps) {
    if (!open) return null;

    const modal = (
        <div
            className="pic-pop"
            onClick={onClose} // 點背景關閉
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
            }}
        >
            <div className="flex-center" onClick={(e) => e.stopPropagation()}>
                <div className="imgbox" style={{ position: "relative" }}>
                    <div
                        className="xx"
                        onClick={onClose}
                        style={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            cursor: "pointer",
                        }}
                    >
                        {/* 原本的 SVG 關閉按鈕 */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="19"
                            viewBox="0 0 18.972 18.969"
                        >
                            <path
                                d="M11297.677-7464.907l-7.777-7.779-7.779,7.779a1,1,0,0,1-1.412,0,1,1,0,0,1-.294-.708,1,1,0,0,1,.294-.708l7.777-7.778-7.777-7.779a.99.99,0,0,1-.294-.706.989.989,0,0,1,.294-.706,1,1,0,0,1,1.412,0l7.779,7.778,7.777-7.778a1,1,0,0,1,1.415,0,.989.989,0,0,1,.294.706.99.99,0,0,1-.294.706l-7.778,7.779,7.778,7.778a1,1,0,0,1,.294.708,1,1,0,0,1-.294.708,1,1,0,0,1-.707.292A1,1,0,0,1,11297.677-7464.907Z"
                                transform="translate(-11280.414 7483.585)"
                                fill="#fff"
                            />
                        </svg>
                    </div>

                    {/* 原圖會依瀏覽器大小自動縮放，但預設會盡量展開 */}
                    <img
                        src={src}
                        alt={alt}
                        style={{ maxWidth: "95vw", maxHeight: "95vh" }}
                    />
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modal, document.body);
}
