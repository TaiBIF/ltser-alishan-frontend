import { Formik, Form } from "formik";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { API } from "../../config/api";

// types
import type {
    ConvertedFieldItemType,
    FilterItemType,
    FilterOptionType,
} from "../../types/item";

// hooks
import { useFieldRenderer } from "../../hooks/useObservation";
import { useLang } from "../../context/LangContext";
import { getObservationText } from "../../i18n/observation";

interface FieldFilterProps {
    observationItem: string;
    fields: ConvertedFieldItemType[];
    setFilters: Dispatch<SetStateAction<Record<string, FilterItemType>>>;
    setCurrentPage: (value: number) => void;
}

const FieldFilter = ({
    observationItem,
    fields,
    setFilters,
    setCurrentPage,
}: FieldFilterProps) => {
    const { lang } = useLang();
    const { renderInputByType } = useFieldRenderer();
    const [optionsMap, setOptionsMap] = useState<
        Record<string, FilterOptionType[]>
    >({});
    const searchTimers = useRef<Record<string, number>>({});

    const optionFields = useMemo(
        () =>
            fields.filter((field) =>
                ["select", "combobox"].includes(field.filter_widget ?? "")
            ),
        [fields]
    );

    const fetchOptions = useCallback(
        async (
            field: ConvertedFieldItemType,
            keyword = "",
            signal?: AbortSignal
        ) => {
            if (!observationItem || !field.filter_widget) return;

            const params = new URLSearchParams();
            params.set("field", field.key);
            params.set(
                "limit",
                field.filter_widget === "select" ? "500" : "20"
            );
            if (keyword.trim()) params.set("q", keyword.trim());

            const res = await fetch(
                API.data.filterOptions(observationItem, params.toString()),
                { signal }
            );
            if (!res.ok) return;

            const json = await res.json();
            const options = Array.isArray(json?.options) ? json.options : [];
            setOptionsMap((prev) => ({ ...prev, [field.key]: options }));
        },
        [observationItem]
    );

    useEffect(() => {
        if (!observationItem) return;

        setOptionsMap({});
        const controller = new AbortController();

        optionFields
            .filter((field) => field.filter_widget === "select")
            .forEach((field) => {
                fetchOptions(field, "", controller.signal);
            });

        return () => controller.abort();
    }, [fetchOptions, observationItem, optionFields]);

    const handleOptionSearch = useCallback(
        (field: ConvertedFieldItemType, keyword: string) => {
            if (field.filter_widget !== "combobox") return;

            window.clearTimeout(searchTimers.current[field.key]);
            searchTimers.current[field.key] = window.setTimeout(() => {
                fetchOptions(field, keyword);
            }, 250);
        },
        [fetchOptions]
    );

    useEffect(() => {
        const timers = searchTimers.current;
        return () => {
            Object.values(timers).forEach((timer) => {
                window.clearTimeout(timer);
            });
        };
    }, []);

    return (
        <>
            <div
                id="search"
                style={{ position: "relative", top: "-96px" }}
            ></div>
            <div className="center-title">
                {getObservationText(lang, "fieldSearchTitle")}
            </div>
            <div className="input-box">
                <Formik
                    enableReinitialize
                    initialValues={fields.reduce((acc, h) => {
                        acc[h.key] = "";
                        return acc;
                    }, {} as Record<string, any>)}
                    onSubmit={(values) => {
                        setFilters(values);
                        setCurrentPage(1);
                    }}
                    onReset={() => {
                        setFilters({});
                        setCurrentPage(1);
                    }}
                >
                    {() => (
                        <Form>
                            <ul className="set-li">
                                {fields.map((f: ConvertedFieldItemType) =>
                                    renderInputByType(
                                        f,
                                        optionsMap[f.key] ?? [],
                                        handleOptionSearch
                                    )
                                )}
                            </ul>

                            <div className="send-btnarea">
                                <button type="reset" className="clearall">
                                    {getObservationText(lang, "clear")}
                                </button>
                                <button type="submit" className="searchall">
                                    {getObservationText(lang, "search")}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default FieldFilter;
