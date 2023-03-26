import './ActionArea.scss';
import PoiList from '../poiList/PoiList';
import ActionAreaMenu from './ActionAreaMenu';
import { useState } from 'react';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import ActionAreaContent from './ActionAreaContent';
import MapPointsListener from '../map/MapPointsListener';
import Point from '../../dataModel/entities/Point';
import MapPoint from '../map/MapPoint';

type PanelKey = 'nearby' | 'filter' | 'details';

type ActionAreaProps = {
    mapListener?: MapPointsListener;
}

function ActionArea({ mapListener }: ActionAreaProps){
    const [visiblePanel, setVisiblePanel] = useState<PanelKey>('nearby');
    const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);

    // TODO: get from GPS
    const referencePoint = new Point(52.4, 16.9);
    const panels = {
        nearby: <PoiList mapListener={mapListener} referencePoint={referencePoint} />,
        filter: <ActionAreaContent title="Filter places"><span>Filter options here</span></ActionAreaContent>,
        details: <ActionAreaContent title="Details"><span>Details here</span></ActionAreaContent>,
    };

    const menuItems = [
        {key: 'nearby', title: 'Show nearby', icon: icon({name: 'map', style: 'regular'})},
        {key: 'filter', title: 'Filter places', icon: icon({name: 'filter', style: 'solid'})},
    ];
    
    // The "Details" view should be only available when a point is selected
    if(selectedPoint !== null) {
        menuItems.push(
            {key: 'details', title: 'Selected place', icon: icon({name: 'location-dot', style: 'solid'})}
        );
    }

    let onMenuItemChange = (key: string) => {
        if(key in panels)
            setVisiblePanel(key as PanelKey);
    };

    mapListener?.setOnMapPointClicked((point) => {
        if(!point.valueEquals(selectedPoint)){
            setVisiblePanel('details');
            setSelectedPoint(point);
        }else{
            setVisiblePanel('nearby');
            setSelectedPoint(null);
        }
    });

    return (
        <div className="action-area">
            <div className="action-area--content">
                {panels[visiblePanel]}
            </div>
            <div className="action-area--menu">
                <ActionAreaMenu
                    onMenuItemChange={onMenuItemChange}
                    menuItems={menuItems}
                    selectedItem={visiblePanel} />
            </div>
        </div>
    );
}

export default ActionArea;