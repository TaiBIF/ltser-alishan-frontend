import type { AsideItemType } from "../types/item";

/** 根據子項 id 反推父層 id（去掉最後一位數） */
const getParentIdFromChild = (childId: number) => Math.trunc(childId / 10);

/** 在 aside 資料中，依 currentItem 找到對應的父層與子層 */
export function findChildByCurrentItem(
    currentItem: number,
    data: AsideItemType[]
): AsideItemType | null {
    if (!Number.isFinite(currentItem)) return null;

    const parentId = getParentIdFromChild(currentItem);
    const parent = data.find((p) => p.id === parentId);
    if (!parent?.list?.length) return null;

    const child = parent.list.find((c) => c.id === currentItem) ?? null;
    return child;
}
