import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";

// types
import type { DashboardItemType } from "../../types/dashboard";

// components
import FieldLayout from "./FieldLayout";

interface EditLayoutProps<T extends Record<string, any>> {
    initialValues: T;
    onSubmit: (values: T) => void | Promise<void>;
    fieldList: DashboardItemType[];
    onDelete?: () => void;
    deleting?: boolean;
    submitting?: boolean;
}

const EditLayout = <T extends Record<string, any>>({
    initialValues,
    onSubmit,
    fieldList,
    onDelete,
    deleting,
    submitting,
}: EditLayoutProps<T>) => {
    const navigate = useNavigate();
    const handleCancelClick = () => {
        navigate(-1);
    };
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize
        >
            <Form className="d-flex flex-column justify-content-between h-100">
                <div>
                    {fieldList
                        .filter((field) => field.show_at_form !== false)
                        .map((field) => (
                            <FieldLayout key={field.id} data={field} />
                        ))}
                </div>

                <div className="d-flex justify-content-between">
                    <div className="c-btns">
                        <button
                            type="submit"
                            className="c-btns__btn e-btn e-btn--primary e-btn--wmax"
                            disabled={submitting}
                        >
                            {/* {!loading ? "儲存" : <Spinner layout="dashboard" />} */}
                            儲存
                        </button>
                        <button
                            type="button"
                            className="c-btns__btn e-btn e-btn--muted e-btn--wmax"
                            onClick={handleCancelClick}
                            disabled={submitting}
                        >
                            取消
                        </button>
                    </div>
                    <button
                        type="button"
                        className="c-btns__btn e-btn e-btn--outline e-btn--wmax"
                        onClick={onDelete}
                        disabled={deleting}
                    >
                        {/* {!loading ? "刪除" : <Spinner layout="dashboard" />} */}
                        刪除
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default EditLayout;
