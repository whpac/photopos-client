import MapPoint from '../../views/map/MapPoint';
import StorageObject, { SerializableObject } from '../storage/StorageObject';

class Point extends MapPoint implements StorageObject {
    public label: string | null = null;

    constructor(latitude: number, longitude: number, label?: string | null) {
        super(latitude, longitude);
        this.label = label ?? null;
    }

    getEntityType(): string {
        return 'Point';
    }

    getSerializableFields(): SerializableObject {
        return {
            label: this.label,
            latitude: this.lat,
            longitude: this.lng,
        };
    }

    static instantiate(raw: SerializableObject): StorageObject {
        return new Point(
            raw.latitude as number,
            raw.longitude as number,
            raw.label as string | null
        );
    }
}

export default Point;