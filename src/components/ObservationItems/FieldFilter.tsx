import { Formik, Form } from "formik";
import type { Dispatch, SetStateAction } from "react";

// types
import type { ConvertedFieldItemType, FilterItemType } from "../../types/item";

// hooks
import { useFieldRenderer } from "../../hooks/useObservation";

interface FieldFilterProps {
    fields: ConvertedFieldItemType[];
    setFilters: Dispatch<SetStateAction<Record<string, FilterItemType>>>;
    setCurrentPage: (value: number) => void;
}

const FieldFilter = ({
    fields,
    setFilters,
    setCurrentPage,
}: FieldFilterProps) => {
    const { renderInputByType } = useFieldRenderer();
    return (
        <>
            <div
                id="search"
                style={{ position: "relative", top: "-96px" }}
            ></div>
            <div className="center-title">資料列表搜尋</div>
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
                                    renderInputByType(f)
                                )}
                            </ul>

                            <div className="send-btnarea">
                                <button type="reset" className="clearall">
                                    清除
                                </button>
                                <button type="submit" className="searchall">
                                    搜尋
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
