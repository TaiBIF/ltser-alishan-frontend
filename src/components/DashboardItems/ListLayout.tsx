import { Link, useLocation } from "react-router-dom";

// types
import type { ColumnItemType } from "../../types/dashboard";

// components
import AddIcon from "../Icons/AddIcon";

// hooks
import { renderDashboardTable } from "../../hooks/useDashboard";

interface ListLayoutProps<T extends { id: string | number }> {
    tableColumnList: ColumnItemType[];
    tableRowList: T[];
}

const ListLayout = <T extends { id: string | number }>({
    tableColumnList,
    tableRowList,
}: ListLayoutProps<T>) => {
    const { renderCell } = renderDashboardTable({
        mediaBaseUrl: import.meta.env.VITE_MEDIA_URL,
    });

    const { pathname } = useLocation();
    const paths = pathname.split("/").filter(Boolean);
    const lastPath = paths.at(-1);

    return (
        <>
            {/* <div className="d-flex mb-3">
                <Link
                    className="e-btn e-btn--primary e-btn--wmax"
                    to={`/dashboard/${lastPath}/add`}
                >
                    <AddIcon />
                    新增
                </Link>
            </div> */}

            <div className="d-flex flex-column justify-content-between">
                <div className="c-table">
                    <table className="c-table__container">
                        <thead>
                            <tr className="c-table__tr c-table__tr--head">
                                {tableColumnList.map((col) =>
                                    col.show ? (
                                        <th
                                            key={col.id}
                                            className="c-table__th"
                                        >
                                            <p className="text-nowrap">
                                                {col.title}
                                            </p>
                                        </th>
                                    ) : null
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {tableRowList.map((row) => (
                                <tr key={row.id} className="c-table__tr">
                                    {lastPath &&
                                        tableColumnList.map((col) =>
                                            renderCell(row, col, lastPath)
                                        )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ListLayout;
