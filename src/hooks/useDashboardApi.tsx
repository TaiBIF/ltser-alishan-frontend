import { useEffect, useRef, useState, useCallback } from "react";

type BuildRequest<TValues> = (values: TValues) => {
    body?: BodyInit | null;
    headers?: HeadersInit;
    methodOverride?: string;
};

type UseCrudOptions<TValues> = {
    url: string; // 目標 URL
    fetchFn?: typeof fetch; // e.g. authFetch
    submitMethod?: string; // 預設 PATCH
    buildRequest: BuildRequest<TValues>; // 如何把 values 組成請求
    onSubmitSuccess?: (res: Response) => void | Promise<void>;
    onSubmitError?: (err: any) => void | Promise<void>;
    onDeleteSuccess?: (res: Response) => void | Promise<void>;
    onDeleteError?: (err: any) => void | Promise<void>;
    okCheck?: (res: Response) => boolean; // 自訂成功判斷（預設 res.ok）
};

export function useDashboardApi<TValues>({
    url,
    fetchFn = fetch,
    submitMethod = "GET",
    buildRequest,
    onSubmitSuccess,
    onSubmitError,
    onDeleteSuccess,
    onDeleteError,
    okCheck = (res) => res.ok,
}: UseCrudOptions<TValues>) {
    const submitControllerRef = useRef<AbortController | null>(null);
    const deleteControllerRef = useRef<AbortController | null>(null);

    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        // 卸載時中止所有進行中的請求
        return () => {
            submitControllerRef.current?.abort();
            deleteControllerRef.current?.abort();
        };
    }, []);

    const submit = async (values: TValues) => {
        // 先中止上一筆提交
        submitControllerRef.current?.abort();
        const controller = new AbortController();
        submitControllerRef.current = controller;
        const { signal } = controller;

        try {
            setSubmitting(true);

            const req = buildRequest(values) || {};
            const method = req.methodOverride || submitMethod;

            const res = await fetchFn(url, {
                method,
                body: req.body,
                headers: req.headers,
                signal,
            });

            if (!okCheck(res)) {
                const text = await res.text().catch(() => "");
                throw new Error(
                    text || `${method} ${url} failed: ${res.status}`
                );
            }

            await onSubmitSuccess?.(res);
            return res;
        } catch (err: any) {
            if (err?.name === "AbortError") return; // 中止不視為錯誤
            await onSubmitError?.(err);
            throw err;
        } finally {
            setSubmitting(false);
            submitControllerRef.current = null;
        }
    };

    const remove = async () => {
        // 先中止上一筆刪除
        deleteControllerRef.current?.abort();
        const controller = new AbortController();
        deleteControllerRef.current = controller;
        const { signal } = controller;

        try {
            setDeleting(true);

            const res = await fetchFn(url, { method: "DELETE", signal });

            if (!okCheck(res)) {
                const text = await res.text().catch(() => "");
                throw new Error(text || `DELETE ${url} failed: ${res.status}`);
            }

            await onDeleteSuccess?.(res);
            return res;
        } catch (err: any) {
            if (err?.name === "AbortError") return;
            await onDeleteError?.(err);
            throw err;
        } finally {
            setDeleting(false);
            deleteControllerRef.current = null;
        }
    };

    const abortAll = useCallback(() => {
        submitControllerRef.current?.abort();
        deleteControllerRef.current?.abort();
    }, []);

    return { submit, remove, submitting, deleting, abortAll };
}
