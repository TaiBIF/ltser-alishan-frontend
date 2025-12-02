import { useState, useEffect, useRef } from "react";

// types
import type { AsideItemType } from "../types/item";

// components
import ArrowIcon from "./Icons/ArrowIcon";

// animation
import { gsapSlideToggle } from "../utils/animation";

interface AsideItemProps {
    item: AsideItemType;
    currentItemKey: string;
    onSelect: (child: { id: number; key: string }) => void;
    defaultOpen?: boolean;
}

const AsideItem = ({
    item,
    currentItemKey,
    onSelect,
    defaultOpen,
}: AsideItemProps) => {
    const targetRef = useRef<HTMLUListElement>(null);

    // 是否包含目前選到的子項
    const hasMatchedChild =
        item.list?.some((c) => c.key === currentItemKey) ?? false;

    // 用這個 state 控制展開，但讓它跟 URL 同步
    const [active, setActive] = useState<boolean>(
        !!defaultOpen || hasMatchedChild
    );

    // 當 URL 的 key 改變時，自動展開/收合
    useEffect(() => {
        setActive(hasMatchedChild);
    }, [hasMatchedChild]);

    const handleMenuClick = () => setActive((v) => !v);

    useEffect(() => {
        const target = targetRef.current;
        if (!target) return;
        target.style.display = "block";
        gsapSlideToggle("auto", target, active);
    }, [active]);

    return (
        <li className="c-aside__list">
            <div
                className={`item-box c-aside__item ${active ? "now" : ""}`}
                onClick={handleMenuClick}
            >
                <p>{item.title}</p>
                <ArrowIcon />
            </div>

            <ul className="level-2 c-aside__menu" ref={targetRef}>
                {item.list?.map((child) => (
                    <li key={child.id} onClick={(e) => e.stopPropagation()}>
                        <a
                            className={`item-box2 ${
                                currentItemKey === child.key ? "now" : ""
                            }`}
                            onClick={() =>
                                onSelect({ id: child.id, key: child.key })
                            }
                        >
                            <div className="paddborderb">
                                <p>{child.title}</p>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </li>
    );
};

export default AsideItem;
