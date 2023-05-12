import MapPoint from '../../views/map/MapPoint';
import StorageObject, { SerializableObject } from '../storage/StorageObject';

class Point extends MapPoint implements StorageObject {
    public label: string | null = null;
    public description: string | null = null;
    public wikiArticle: string | null = null;
    public qId: string | null = null;

    constructor(latitude: number, longitude: number, label?: string | null,
        description?: string | null, wikiArticle?: string | null, qId?: string | null) {
        super(latitude, longitude);
        this.label = label ?? null;
        this.description = description ?? null;
        this.wikiArticle = wikiArticle ?? null;
        this.qId = qId ?? null;
    }

    getEntityType(): string {
        return Point.getEntityType();
    }

    getSerializableFields(): SerializableObject {
        return {
            label: this.label,
            latitude: this.lat,
            longitude: this.lng,
            description: this.description,
            wikiArticle: this.wikiArticle,
            qId: this.qId
        };
    }

    static instantiate(raw: SerializableObject): StorageObject {
        return new Point(
            raw.latitude as number,
            raw.longitude as number,
            raw.label as string | null,
            raw.description as string | null,
            raw.wikiArticle as string | null,
            raw.qId as string | null
        );
    }

    static getEntityType(): string {
        return 'Point';
    }

    public override hasLabel(): boolean {
        return this.label !== null;
    }

    public override getLabel(): string {
        return this.label ?? '';
    }
}

export default Point;