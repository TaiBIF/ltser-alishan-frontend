import { useState, useEffect, useRef } from "react";

// types
import type { QAType } from "../types/item";

// animation
import { gsapSlideToggle } from "../utils/animation";

type QAItemProps = { data: QAType[] };

const QAItem = ({ data }: QAItemProps) => {
    const [active, setActive] = useState<boolean>(false);
    const targetRef = useRef<HTMLDivElement>(null);

    const handleItemClick = () => {
        setActive(!active);
    };

    useEffect(() => {
        const target = targetRef.current;
        if (target) {
            target.style.display = "block";
            if (active) {
                gsapSlideToggle("auto", target, true);
            } else {
                gsapSlideToggle("auto", target, false);
            }
        }
    }, [active]);

    const renderedQA = data.map((qa) => {
        return (
            <li
                key={qa.id}
                className={`${active ? "now" : ""}`}
                onClick={handleItemClick}
            >
                <div className="quesbox ">
                    <div className="mark-q">Q</div>
                    <p>{qa.question}</p>
                    {/* <ArrowIcon /> */}
                </div>
                <div
                    className="ansbox"
                    ref={targetRef}
                    style={{ display: "none", overflow: "hidden" }}
                >
                    <div className="flex inner">
                        <div className="mark-a">A</div>
                        <p>{qa.answer}</p>
                    </div>
                </div>
            </li>
        );
    });
    return <ul className="qa-list">{renderedQA}</ul>;
};

export default QAItem;
