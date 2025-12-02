// types
import type { CouEventFieldItemType } from "../../types/dashboard";

// data
import { couEventEditFieldList } from "../../data/dashboard";

// components
import AddLayout from "./AddLayout";

const initialValues: CouEventFieldItemType = {
    date: "",
    loctation: "",
    category: "",
    content: "",
    image: "",
};

const onSubmit = (values: CouEventFieldItemType) => {
    console.log("submit:", values);
};

const CouEventAdd = () => {
    return (
        <AddLayout
            initialValues={initialValues}
            onSubmit={onSubmit}
            fieldList={couEventEditFieldList}
        />
    );
};

export default CouEventAdd;
