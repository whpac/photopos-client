import MapPoint from '../../views/map/MapPoint';
import StorageObject, { SerializableObject } from '../storage/StorageObject';

class PointList implements StorageObject {
    // Hash codes of points in the list
    protected points: Set<string>;

    constructor(points: string[] = []) {
        this.points = new Set(points);
    }

    /**
     * Checks whether the passed point is on the list
     * @param point The point to check
     * @returns Whether the point is on the list
     */
    isOnList(point: MapPoint): boolean {
        return this.points.has(point.getHashCode());
    }

    /**
     * Adds the passed point to the list
     * @param point The point to add to the list
     */
    addToList(point: MapPoint): void {
        this.points.add(point.getHashCode());
    }

    /**
     * Removes the passed point from the list
     * @param point The point to remove from the list
     */
    removeFromList(point: MapPoint): void {
        this.points.delete(point.getHashCode());
    }

    getEntityType(): string {
        return PointList.getEntityType();
    }

    getSerializableFields(): SerializableObject {
        return {
            points: Array.from(this.points)
        };
    }

    static instantiate(raw: SerializableObject): StorageObject {
        return new PointList(
            raw.points as string[]
        );
    }

    static getEntityType(): string {
        return 'PointList';
    }
}

export default PointList;