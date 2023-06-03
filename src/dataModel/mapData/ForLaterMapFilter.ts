import MapFilter from '../../views/map/MapFilter';
import MapPoint from '../../views/map/MapPoint';
import EventListenerSet, { EventListener } from '../EventListenerSet';
import PointList from '../entities/PointList';

class ForLaterMapFilter implements MapFilter {
    onChange: EventListenerSet<MapFilter, null>;
    fireOnChange: EventListener<MapFilter, null>;

    protected _filterOnlyForLater = false;
    protected pointList: PointList;

    /**
     * Whether to only show points that are on the user's "for later" list
     */
    public set filterOnlyForLater(value: boolean) {
        this._filterOnlyForLater = value;
        this.fireOnChange(this, null);
    }
    public get filterOnlyForLater() {
        return this._filterOnlyForLater;
    }

    constructor(pointList: PointList) {
        this.pointList = pointList;
        [this.onChange, this.fireOnChange] = EventListenerSet.create();
    }

    filter(points: MapPoint[]): MapPoint[] {
        if(!this.filterOnlyForLater) return points;
        return points.filter((point) => this.pointList.isOnList(point));
    }
}

export default ForLaterMapFilter;