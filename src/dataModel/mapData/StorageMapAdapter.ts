import MapAdapter from '../../views/map/MapAdapter';
import MapPoint from '../../views/map/MapPoint';
import MapTile from '../entities/MapTile';
import StorageId from '../storage/StorageId';
import StorageManager from '../storage/StorageManager';

class StorageMapAdapter implements MapAdapter {

    protected storage: StorageManager;

    constructor(storage: StorageManager) {
        this.storage = storage;
    }

    async getPoints(latMin: number, latMax: number, lngMin: number, lngMax: number): Promise<MapPoint[]> {
        const tilesToFetch = [
            new StorageId('MapTile', '0')
        ];
        const tilesAwaiters = [];

        for(const tile of tilesToFetch) {
            tilesAwaiters.push(this.storage.retrieve(tile));
        }
        const fetchedTiles = await Promise.all(tilesAwaiters) as (null | MapTile)[];
        const points: MapPoint[] = [];

        for(const tile of fetchedTiles) {
            if(tile === null) {
                continue;
            }
            points.push(...tile.getPoints());
        }

        return points;
    }
}

export default StorageMapAdapter;