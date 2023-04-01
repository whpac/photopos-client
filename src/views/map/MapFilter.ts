import EventListenerSet from '../../dataModel/EventListenerSet';
import MapPoint from './MapPoint';

interface MapFilter {

    /** An event that's fired when a filter option is changed */
    onChange: EventListenerSet<MapFilter, null>;

    /**
     * Filters the points to only include those that meet some conditions
     * @param mapPoint The points to filter
     */
    filter(mapPoint: MapPoint[]): MapPoint[];
}

export default MapFilter;