// data
import SubPeoIcon from "../assets/peoicon2.svg";

// types
import type { ContactItemType } from "../types/item";

type SubContactProps = { data: ContactItemType[] };

const SubContact = ({ data }: SubContactProps) => {
    const renderedSubContacts = data.map((contact) => {
        return (
            <li key={contact.id}>
                <div className="wbox">
                    <div className="picbox">
                        <div className="peoimg">
                            <img src={contact.img} alt={contact.name} />
                        </div>
                        <div className="iconbox">
                            <img src={SubPeoIcon} alt="peoicon2" />
                        </div>
                    </div>
                    <div className="txt-area">
                        <div className="company">{contact.university}</div>
                        <div
                            className="job-unit"
                            style={{ whiteSpace: "pre-line" }}
                        >
                            {contact.department}
                            <br />
                            {contact.position}
                        </div>
                        <h2 className="peo-name">{contact.name}</h2>
                        <div
                            className="job-unit"
                            style={{
                                whiteSpace: "pre-line",
                                fontSize: 14,
                            }}
                        >
                            {contact.mail}
                        </div>
                    </div>
                </div>
            </li>
        );
    });
    return <ul className="team-list">{renderedSubContacts}</ul>;
};

export default SubContact;
