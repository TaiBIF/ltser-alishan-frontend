type BannerProps = {
    title: string;
    en: string;
    bgImg: string;
};

const Banner = ({ title, en, bgImg }: BannerProps) => {
    return (
        <div className="bn-area">
            <div className="bntitleboxarea">
                <div className="main-box">
                    <div className="bntitle">
                        <h2 style={{ whiteSpace: "pre-line" }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="60.979"
                                viewBox="0 0 24 60.979"
                            >
                                <g
                                    id="Group_8091"
                                    data-name="Group 8091"
                                    transform="translate(10525 -1682.479)"
                                >
                                    <path
                                        id="Path_22556"
                                        data-name="Path 22556"
                                        d="M12.272,2.962a2,2,0,0,1,3.455,0L26.245,20.992A2,2,0,0,1,24.518,24H3.482a2,2,0,0,1-1.728-3.008Z"
                                        transform="translate(-10501 1681) rotate(90)"
                                        fill="#333"
                                    />
                                    <path
                                        id="Path_22557"
                                        data-name="Path 22557"
                                        d="M12.788,2.833a2,2,0,0,1,3.424,0L27.167,20.966A2,2,0,0,1,25.455,24H3.545a2,2,0,0,1-1.712-3.034Z"
                                        transform="translate(-10501 1716) rotate(90)"
                                        fill="#6db6f6"
                                    />
                                    <path
                                        id="Path_22558"
                                        data-name="Path 22558"
                                        d="M12.272,2.962a2,2,0,0,1,3.455,0L26.245,20.992A2,2,0,0,1,24.518,24H3.482a2,2,0,0,1-1.728-3.008Z"
                                        transform="translate(-10525 1727) rotate(-90)"
                                        fill="#eb6868"
                                    />
                                </g>
                            </svg>
                            {en}
                        </h2>
                        <h3>{title}</h3>
                    </div>
                </div>
            </div>
            <div className="mask-brown" />
            {bgImg && (
                <div
                    className="pic-box"
                    style={{ backgroundImage: `url(${bgImg})` }}
                />
            )}
        </div>
    );
};

export default Banner;
