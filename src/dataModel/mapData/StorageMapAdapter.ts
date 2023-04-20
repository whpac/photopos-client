import MapAdapter from '../../views/map/MapAdapter';
import MapPoint from '../../views/map/MapPoint';
import MapTile from '../entities/MapTile';
import StorageId from '../storage/StorageId';
import StorageManager from '../storage/StorageManager';
import TileCalculator from './TileCalculator';

class StorageMapAdapter implements MapAdapter {

    protected readonly MAX_BATCH_FETCH = 10;

    protected storage: StorageManager;
    protected tileCalculator: TileCalculator;

    constructor(storage: StorageManager) {
        this.storage = storage;
        this.tileCalculator = new TileCalculator();
    }

    async getPoints(latMin: number, latMax: number, lngMin: number, lngMax: number): Promise<MapPoint[]> {
        const tileCount = this.tileCalculator.countTilesInBounds(latMin, latMax, lngMin, lngMax);
        if(tileCount > this.MAX_BATCH_FETCH) {
            return [];
        }

        const minTile = this.tileCalculator.getTile(latMin, lngMin);
        const maxTile = this.tileCalculator.getTile(latMax, lngMax);

        const tilesToFetch = [];
        for(let x = minTile[0]; x <= maxTile[0]; x++) {
            for(let y = minTile[1]; y <= maxTile[1]; y++) {
                tilesToFetch.push(new StorageId(MapTile.getEntityType(), x + ',' + y));
            }
        }

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