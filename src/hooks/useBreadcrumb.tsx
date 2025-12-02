import { useLocation } from "react-router-dom";
import { useMemo } from "react";

// types
import type { BreadcrumbType } from "../types/item";

// data
import { breadcrumbList } from "../data/breadcrumb";

type Options = {
    // 可選：自訂 items（若你想傳入不同來源的樹）
    items?: BreadcrumbType[];
    // 可選：覆寫 pathname（大多時候不用傳）
    pathname?: string;
    // 可選：自訂比對規則（預設全等）
    match?: (nodePath: string | undefined, pathname: string) => boolean;
};

export function useBreadcrumb(options?: Options) {
    const location = useLocation();
    let pathname = options?.pathname ?? location.pathname;

    // 拆 segments
    const segments = pathname.split("/").filter(Boolean);

    // 如果第二段是數字，就只取第一段
    if (segments.length >= 2 && /^\d+$/.test(segments[1])) {
        pathname = "/" + segments[0];
    }
    // 否則如果層數超過兩層，取前兩層
    else if (segments.length > 2) {
        pathname = "/" + segments.slice(0, 2).join("/");
    }

    // 預設用 breadcrumbList()
    const items = useMemo(
        () => options?.items ?? breadcrumbList(),
        // 若 options?.items 是外部傳進來的參考，就放進依賴
        // 沒傳就是只在 mount 時跑一次 breadcrumbList()
        [options?.items]
    );

    const match =
        options?.match ?? ((a: string | undefined, b: string) => a === b);

    const result = useMemo(() => {
        type Res = {
            node?: BreadcrumbType;
            trail: string[];
            nodes: BreadcrumbType[];
        };

        const dfs = (
            list: BreadcrumbType[],
            titles: string[],
            nodes: BreadcrumbType[]
        ): Res | undefined => {
            for (const item of list) {
                const nextTitles = [...titles, item.title_zh];
                const nextNodes = [...nodes, item];

                if (match(item.path, pathname)) {
                    return { node: item, trail: nextTitles, nodes: nextNodes };
                }
                if (item.list?.length) {
                    const r = dfs(item.list, nextTitles, nextNodes);
                    if (r) return r;
                }
            }
            return undefined;
        };

        return dfs(items, [], []) ?? { node: undefined, trail: [], nodes: [] };
    }, [items, pathname, match]);

    return {
        node: result.node, // 當前節點
        trail: result.trail, // 中文麵包屑（字串陣列）
        nodes: result.nodes, // 節點陣列
    };
}
