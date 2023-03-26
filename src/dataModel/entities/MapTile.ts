import StorageObject, { SerializableObject } from '../storage/StorageObject';
import Point from './Point';

class MapTile implements StorageObject {
    protected points: Point[];

    constructor(points: Point[] = []) {
        this.points = points;
    }

    getPoints(): Point[] {
        return this.points;
    }

    getEntityType(): string {
        return 'MapTile';
    }

    getSerializableFields(): SerializableObject {
        return {
            points: this.points
        };
    }

    static instantiate(raw: SerializableObject): StorageObject {
        return new MapTile(
            raw.points as Point[]
        );
    }
}

export default MapTile;