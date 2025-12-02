// types
import type { EventItemType } from "../../types/item";

// components
import { ImagePop } from "../ImagePop";

interface CoutEventResultProps {
    filteredEvent: EventItemType[];
}

const CouEventResult = ({ filteredEvent }: CoutEventResultProps) => {
    return (
        <div className="event-result-box">
            <table cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        <td className="w_15">日期</td>
                        <td className="w_20">地點</td>
                        <td className="w_20">項目</td>
                        <td className="w_30">說明</td>
                        <td className="w_15">影像記錄</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredEvent.map((event: EventItemType) => (
                        <tr key={event.id}>
                            <td>{event.date}</td>
                            <td>{event.location}</td>
                            <td>{event.types_display.join(", ")}</td>
                            <td>{event.content}</td>
                            <td>
                                {event.images &&
                                    event.images.map((i, index) => (
                                        <ImagePop
                                            key={index}
                                            thumbSrc={i.image}
                                            fullSrc={i.image}
                                            alt={event.content}
                                        />
                                    ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CouEventResult;
