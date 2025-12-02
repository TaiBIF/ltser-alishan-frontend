// data
import MainPeoIcon from "../assets/peoicon1.svg";

// types
import type { ContactItemType } from "../types/item";

// components
import ContactDeco from "./ContactDeco";

type MainContactProps = { data: ContactItemType };

const MainContact = ({ data }: MainContactProps) => {
    return (
        <div className="main-peobox">
            <div className="centw">
                <div className="cirline">
                    <ContactDeco />
                </div>

                <div className="picbox">
                    <div className="peoimg">
                        <img src={data.img} alt={data.name} />
                    </div>
                    <div className="iconbox">
                        <img src={MainPeoIcon} alt="" />
                    </div>
                </div>
                <div className="txt-area">
                    <div className="pj-title">
                        <div className="linemb" />
                        {data.role}
                    </div>
                    <div className="company">{data.university}</div>
                    <div
                        className="job-unit"
                        style={{ whiteSpace: "pre-line" }}
                    >
                        {data.department}
                        <br />
                        {data.position}
                    </div>
                    <h2 className="peo-name">{data.name}</h2>
                    <div
                        className="job-unit"
                        style={{
                            whiteSpace: "pre-line",
                            fontSize: 14,
                        }}
                    >
                        {data.mail}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContact;
