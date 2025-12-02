import { Link } from "react-router-dom";

// types
import type { NewsItemType } from "../../types/item";

type NewsItemProps = {
    data: NewsItemType;
};

const NewsItem = ({ data }: NewsItemProps) => {
    return (
        <>
            <li>
                <Link to={`/news/${data.id}`}>
                    <div className="cat-date">
                        <div className="category e-tag e-tag--news">
                            {data.type_zh}
                        </div>
                        <div className="date">{data.published_at}</div>
                    </div>
                    <h3>{data.title}</h3>
                    <p>{data.content}</p>
                </Link>
            </li>
        </>
    );
};

export default NewsItem;
