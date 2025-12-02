import { useCallback } from "react";
import { Link } from "react-router-dom";

// components
import EditIcon from "../components/Icons/EditIcon";
import ViewIcon from "../components/Icons/ViewIcon";

export type TypeItem = { id: string | number; title?: string; name?: string };

export type ColItem = {
    id: string;
    show?: boolean;
    space?: "text" | "date" | "nowrap";
    relate?: TypeItem[];
    param?: boolean; // 你原先邏輯：param 欄位就導到 edit
};

export type Row = Record<string, any>;

type DashboardTableRenderProps = {
    mediaBaseUrl: string;
};

export function renderDashboardTable({
    mediaBaseUrl,
}: DashboardTableRenderProps) {
    // 1) 組圖檔 URL
    const getMediaUrl = useCallback(
        (v: string) => (v?.startsWith("http") ? v : `${mediaBaseUrl}${v}`),
        [mediaBaseUrl]
    );

    // 2) 欄位空白樣式
    const getSpaceClass = useCallback((space?: ColItem["space"]) => {
        switch (space) {
            case "text":
                return "c-table__td c-table__td--text";
            case "date":
            case "nowrap":
                return "c-table__td text-nowrap";
            default:
                return "c-table__td";
        }
    }, []);

    // 3) 關聯值轉可讀字串
    const resolveRelate = useCallback((value: unknown, relate?: TypeItem[]) => {
        if (!relate) return null;
        const hit = relate.find((r) => r.id === value);
        if (!hit) return null;
        return hit.title ?? hit.name ?? String(value);
    }, []);

    // 4) 渲染值（不含外層 <td>，方便重用）
    const renderValue = useCallback(
        (key: string, value: any, col: ColItem, path: string) => {
            // param 欄位：連到編輯頁
            if (
                col.param &&
                (typeof value === "string" || typeof value === "number")
            ) {
                return (
                    <Link
                        className="e-link"
                        to={`/dashboard/${path}/edit/${value}`}
                    >
                        <EditIcon />
                        {value}
                    </Link>
                );
            }

            // 特別欄位例外
            if (col.id === "cover") {
                return null; // 交給外層處理
            }

            // 陣列值：逐項 + relate 映射
            if (Array.isArray(value)) {
                if (value.length === 0) return <span>-</span>;
                return (
                    <ul className="list-unstyled">
                        {value.map((v: any, i: number) => {
                            const readable = resolveRelate(v, col.relate);
                            return <li key={i}>{readable ?? String(v)}</li>;
                        })}
                    </ul>
                );
            }

            // null/undefined
            if (value == null) return <span>-</span>;

            // 有 relate：轉可讀
            const related = resolveRelate(value, col.relate);
            if (related) return related;

            // 圖片或檔案欄位
            if (key === "image" || key === "file") {
                const href = getMediaUrl(String(value));
                return (
                    <div className="c-table__td">
                        <a
                            href={href}
                            className="e-link"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <ViewIcon />
                            查看
                        </a>
                    </div>
                );
            }

            // 其他一般值
            return String(value);
        },
        [getMediaUrl, resolveRelate]
    );

    // 5) 單一 cell（含外層 <td> + class）
    const renderCell = useCallback(
        (row: Row, col: ColItem, path: string) => {
            if (!col.show) return null;
            const value = row[col.id];
            if (col.id === "media_url") {
                return (
                    <td key={col.id}>
                        <div className={getSpaceClass(col.space)}>
                            {value ? (
                                <a
                                    href={value}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="e-link"
                                    title="查看圖片"
                                >
                                    <ViewIcon /> 查看
                                </a>
                            ) : (
                                <span>-</span>
                            )}
                        </div>
                    </td>
                );
            }
            const content = renderValue(col.id, value, col, path);
            return (
                <td key={col.id}>
                    <div className={getSpaceClass(col.space)}>
                        {content ?? <span>-</span>}
                    </div>
                </td>
            );
        },
        [getSpaceClass, renderValue]
    );

    return {
        getMediaUrl,
        getSpaceClass,
        resolveRelate,
        renderValue,
        renderCell,
    };
}
