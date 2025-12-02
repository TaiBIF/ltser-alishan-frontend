// types
import type { LiteratureItemType } from "../types/item";

interface LiteratureResultProps {
    filteredLiterature: LiteratureItemType[];
}

const LiteratureResult = ({ filteredLiterature }: LiteratureResultProps) => {
    return (
        <ul className="literature-list">
            {filteredLiterature.map((literature, index) => {
                return (
                    <li key={index}>
                        <div>
                            <div>
                                {literature.types_display &&
                                    literature.types_display.map(
                                        (type, index) => {
                                            return (
                                                <span
                                                    className="l-tag"
                                                    key={index}
                                                >
                                                    {type}
                                                </span>
                                            );
                                        }
                                    )}
                            </div>

                            {literature.link ? (
                                <a
                                    href={literature.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="l-url"
                                >
                                    {literature.title}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13.5 10.5L21 3m-5 0h5v5m0 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"
                                        />
                                    </svg>
                                </a>
                            ) : (
                                <div>{literature.title}</div>
                            )}
                        </div>

                        <div className="l-right-text">
                            {literature.author}（{literature.published_year}）
                        </div>
                        <div className="l-right-text">
                            {literature.affiliation}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default LiteratureResult;
