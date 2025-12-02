import { useEffect, useState } from "react";

// helpers
import { swalToast } from "../../helpers/CustomSwal";

// data
import { introductionTableColumnList } from "../../data/dashboard";

// compoenets
import ListLayout from "./ListLayout";

const IntroductionList = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/dashboard/introduction/")
            .then((res) => res.json())
            .then(setRows)
            .catch((err) => {
                console.error("載入 couevent 失敗：", err);
                swalToast.fire({
                    icon: "error",
                    title: "獲取資料失敗，請稍後再試或聯繫網站管理員",
                });
                setRows([]);
            });
    }, []);
    return (
        <ListLayout
            tableColumnList={introductionTableColumnList}
            tableRowList={rows}
        />
    );
};

export default IntroductionList;
