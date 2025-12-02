// types
import type { AsideItemType } from "../../types/item";

interface TitleProps {
    entry: AsideItemType;
}

const Title = ({ entry }: TitleProps) => {
    return (
        <div className="infbox-title">
            <div className="titlearea">
                <h2>
                    {entry?.title}
                    <div className="mark-cir">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={18}
                            height={18}
                            viewBox="0 0 18 18"
                        >
                            <g
                                id="Ellipse_2931"
                                data-name="Ellipse 2931"
                                fill="none"
                                stroke="#e8d06a"
                                strokeWidth={4}
                            >
                                <circle cx={9} cy={9} r={9} stroke="none" />
                                <circle cx={9} cy={9} r={7} fill="none" />
                            </g>
                        </svg>
                    </div>
                </h2>
                <div className="line" />
            </div>
            <a
                href={entry?.link}
                className="meta"
                target="_blank"
                rel="noreferrer"
            >
                查看資料集與研究方法
            </a>
        </div>
    );
};

export default Title;
