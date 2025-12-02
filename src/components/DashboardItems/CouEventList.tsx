import { useEffect, useState } from "react";

// helpers
import { swalToast } from "../../helpers/CustomSwal";

// data
import { couEventTableColumnList } from "../../data/dashboard";

// compoenets
import ListLayout from "./ListLayout";

const CouEventList = () => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/dashboard/couevent/")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setRows(data.results || []);
            })
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
            tableColumnList={couEventTableColumnList}
            tableRowList={rows}
        />
    );
};

export default CouEventList;
