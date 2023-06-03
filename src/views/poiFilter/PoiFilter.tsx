import './PoiFilter.scss';
import ForLaterMapFilter from '../../dataModel/mapData/ForLaterMapFilter';
import ActionAreaContent from '../actionArea/ActionAreaContent';
import { useState } from 'react';

type PoiFilterProps = {
    filter: ForLaterMapFilter;
};

function PoiFilter({ filter }: PoiFilterProps) {
    const [isChecked, setIsChecked] = useState(filter.filterOnlyForLater);

    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
        filter.filterOnlyForLater = e.target.checked;
    };

    return (
        <ActionAreaContent title="Filter places">
            <div className="poi-filter">
                <label>
                    <input type="checkbox" checked={isChecked} onChange={onCheckboxChange} />
                    Display only places saved for later
                </label>
            </div>
        </ActionAreaContent>
    );
}

export default PoiFilter;