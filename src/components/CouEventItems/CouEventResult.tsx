// types
import type { EventItemType } from "../../types/item";
import { useLang } from "../../context/LangContext";
import {
    getCouEventText,
    resolveCouEventTypeLabel,
} from "../../i18n/couEvent";

// components
import { ImagePop } from "../ImagePop";

interface CoutEventResultProps {
    filteredEvent: EventItemType[];
}

const CouEventResult = ({ filteredEvent }: CoutEventResultProps) => {
    const { lang } = useLang();

    return (
        <div className="event-result-box">
            <table cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        <td className="w_15">
                            {getCouEventText(lang, "tableDate")}
                        </td>
                        <td className="w_20">
                            {getCouEventText(lang, "tableLocation")}
                        </td>
                        <td className="w_20">
                            {getCouEventText(lang, "tableItem")}
                        </td>
                        <td className="w_30">
                            {getCouEventText(lang, "tableDescription")}
                        </td>
                        <td className="w_15">
                            {getCouEventText(lang, "tableImageRecord")}
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {filteredEvent.map((event: EventItemType) => (
                        <tr key={event.id}>
                            <td>{event.date}</td>
                            <td>{event.location}</td>
                            <td>
                                {event.types_display
                                    .map((type, index) =>
                                        resolveCouEventTypeLabel(
                                            event.types?.[index] ?? "",
                                            type,
                                            lang,
                                        ),
                                    )
                                    .join(", ")}
                            </td>
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
