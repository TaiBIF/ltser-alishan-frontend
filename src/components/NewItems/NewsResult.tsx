import { Link } from "react-router-dom";

// types
import type { NewsItemType } from "../../types/item";
import { useLang } from "../../context/LangContext";
import { resolveNewsTypeLabel } from "../../i18n/news";

interface NewsResultProps {
    filteredNews: NewsItemType[];
}

const NewsResult = ({ filteredNews }: NewsResultProps) => {
    const { lang } = useLang();

    return (
        <div className="news-list">
            <ul>
                {filteredNews.map((news: NewsItemType, index) => {
                    return (
                        <li key={index}>
                            <Link to={`/news/${news.id}`}>
                                <div className="cat-date">
                                    {news.types_display.map((type, index) => {
                                        const typeKey = news.types?.[index] ?? "";
                                        return (
                                            <div
                                                key={index}
                                                className="category e-tag e-tag--news"
                                            >
                                                {resolveNewsTypeLabel(
                                                    typeKey,
                                                    type,
                                                    lang,
                                                )}
                                            </div>
                                        );
                                    })}

                                    <div className="date">{news.date}</div>
                                </div>
                                <h3>{news.title}</h3>
                                <p>{news.content}</p>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default NewsResult;
