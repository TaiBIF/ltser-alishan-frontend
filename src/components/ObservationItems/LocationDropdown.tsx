// components
import ArrowIcon from "../Icons/ArrowIcon";

type LocationItemType = {
    id: number;
    location_id: string;
    location_name: string;
    decimal_latitude: string;
    decimal_longitude: string;
};

interface LocationDropdownProps {
    locations: LocationItemType[];
    setLocationID: (value: string) => void;
}

const LocationDropdown = ({
    locations,
    setLocationID,
}: LocationDropdownProps) => {
    if (!locations || locations.length === 0) {
        return (
            <div className="c-select c-form__set c-select__flex-container">
                <div>目前沒有可用樣站</div>
            </div>
        );
    }

    return (
        <div className="c-select c-form__set c-select__flex-container">
            <div>
                <label htmlFor="site" className="c-select__label c-form__label">
                    請選擇測站/樣區
                </label>
                <div className="c-select__wrapper">
                    <select
                        className="c-select__select"
                        onChange={(e) => {
                            setLocationID(e.target.value);
                        }}
                    >
                        <option value="" disabled>
                            請選擇測站/樣區
                        </option>

                        {locations.map((l: LocationItemType) => (
                            <option key={l.id} value={l.location_id}>
                                {l.location_name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="site" className="c-select__arrow">
                        <ArrowIcon />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default LocationDropdown;
