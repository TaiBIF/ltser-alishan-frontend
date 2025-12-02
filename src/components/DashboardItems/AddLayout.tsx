import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";

// types
import type { DashboardFieldItemType } from "../../types/dashboard";

// components
import FieldLayout from "./FieldLayout";

interface AddLayoutProps<T extends Record<string, any>> {
    initialValues: T;
    onSubmit: (values: T) => void | Promise<void>;
    fieldList: DashboardFieldItemType[];
    submitting?: boolean;
}

const AddLayout = <T extends Record<string, any>>({
    initialValues,
    onSubmit,
    fieldList,
    submitting,
}: AddLayoutProps<T>) => {
    const navigate = useNavigate();
    const handleCancelClick = () => {
        navigate(-1);
    };
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                enableReinitialize
            >
                <Form className="d-flex flex-column justify-content-between h-100">
                    <div>
                        {fieldList.map((field) => (
                            <FieldLayout
                                key={field.id}
                                data={field}
                            ></FieldLayout>
                        ))}
                    </div>

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
                </Form>
            </Formik>
        </>
    );
};

export default AddLayout;
