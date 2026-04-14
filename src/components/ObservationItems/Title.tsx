// types
import type { AsideItemType } from "../../types/item";
import { useLang } from "../../context/LangContext";
import {
    getObservationText,
    resolveObservationAsideTitle,
} from "../../i18n/observation";

interface TitleProps {
    entry: AsideItemType;
}

const Title = ({ entry }: TitleProps) => {
    const { lang } = useLang();

    return (
        <div className="infbox-title">
            <div className="titlearea">
                <h2>
                    {resolveObservationAsideTitle(entry.key, entry.title, lang)}
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
                {getObservationText(lang, "viewDatasetAndMethod")}
            </a>
        </div>
    );
};

export default Title;
