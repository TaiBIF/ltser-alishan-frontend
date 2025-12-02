import { Formik, Form, Field, ErrorMessage } from "formik";

// components
import FieldLayout from "./FieldLayout";

type FormValues = {
    email: string;
    first_name: string;
    last_name: string;
    role: string;
};

const initialValues: FormValues = {
    email: "",
    first_name: "",
    last_name: "",
    role: "",
};

const onSubmit = (values: FormValues) => {
    console.log("submit:", values);
};

type FieldItem = {
    id: string | number;
    type: string;
    title: string;
    label: string;
    options?: RelateTypes[];
    readonly?: boolean;
    required?: boolean;
    hints?: RelateTypes[];
    multiple?: boolean;
    cover?: number | string;
    fileType?: string;
};

const userFieldList: FieldItem[] = [
    {
        id: 1,
        type: "email",
        title: "email",
        label: "帳號",
        readonly: true,
        required: true,
    },
    { id: 2, type: "text", title: "first_name", label: "姓", required: true },
    { id: 3, type: "text", title: "last_name", label: "名", required: true },
    { id: 4, type: "text", title: "role", label: "角色", required: true },
];

const User = () => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="d-flex flex-column justify-content-between h-100">
                <div>
                    {userFieldList.map((field) => (
                        <FieldLayout data={field} />
                    ))}
                </div>

                <div className="c-btns">
                    <button
                        type="submit"
                        className="c-btns__btn e-btn e-btn--primary e-btn--wmax"
                    >
                        {/* {!loading ? "儲存" : <Spinner layout="dashboard" />} */}
                        儲存
                    </button>
                </div>
            </Form>
        </Formik>
    );
};

export default User;
