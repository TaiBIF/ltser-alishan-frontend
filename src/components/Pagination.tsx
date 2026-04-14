import type { Dispatch, SetStateAction } from "react";

// components
import PrevIcon from "./Icons/PrevIcon";
import NextIcon from "./Icons/NextIcon";

interface PaginationProps {
    scrollTargetRef?: any;
    currentPage: number;
    totalPages: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    prevText?: string;
    nextText?: string;
}

const Pagination = (props: PaginationProps) => {
    const {
        scrollTargetRef = null,
        currentPage,
        setCurrentPage,
        totalPages,
        prevText = "上一頁",
        nextText = "下一頁",
    } = props;

    const pageList = () => {
        let pageArr = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i < currentPage + 2 && i > currentPage - 2) {
                pageArr.push(i);
            }
        }
        return pageArr;
    };

    const prevs = currentPage - 2;
    const nexts = currentPage + 2;

    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    const isFirstPage = currentPage === 1 || prevs <= 1;
    const isLastPage = currentPage === totalPages || nexts >= totalPages;

    const handlePage = (page: number) => {
        setCurrentPage(page);
        if (scrollTargetRef) {
            (scrollTargetRef.current as HTMLElement).scrollIntoView({
                behavior: "smooth",
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <div className="page-num">
                {/*現在位置加now*/}
                {!isFirstPage && (
                    <div
                        onClick={() => {
                            handlePage(1);
                        }}
                        className="num m-1"
                    >
                        1
                    </div>
                )}
                {hasPrev && (
                    <div
                        onClick={() => {
                            handlePage(currentPage - 1);
                        }}
                        className="back m-1"
                    >
                        <PrevIcon />
                        <p>{prevText}</p>
                    </div>
                )}
                {pageList().map((v) => {
                    return (
                        <div
                            key={v}
                            className={`num m-1 ${
                                currentPage === v ? "now" : ""
                            }`}
                            onClick={() => {
                                handlePage(v);
                            }}
                        >
                            {v}
                        </div>
                    );
                })}
                {hasNext && (
                    <div
                        className="next m-1"
                        onClick={() => {
                            handlePage(currentPage + 1);
                        }}
                    >
                        <p>{nextText}</p>
                        <NextIcon />
                    </div>
                )}
                {!isLastPage && (
                    <div
                        className="num m-1"
                        onClick={() => {
                            handlePage(totalPages);
                        }}
                    >
                        {totalPages}
                    </div>
                )}
            </div>
        </>
    );
};

export default Pagination;
