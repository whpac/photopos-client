class TileCalculator {
    /** The north-south resolution in tiles per degree */
    protected resNS: number;
    /** The east-west resolution in tiles per degree */
    protected resEW: number;

    constructor() {
        this.resNS = 1;
        this.resEW = 1;
    }

    /**
     * Calculates the tile coordinates for a given point.
     * @param lat The point latitude
     * @param lng The point longitude
     * @returns The tile coordinates
     */
    public getTile(lat: number, lng: number): [number, number] {
        const tileNS = Math.floor(lat * this.resNS);
        const tileEW = Math.floor(lng * this.resEW);
        return [tileNS, tileEW];
    }

    /**
     * Counts all the tiles that are at least partially contained in a bounding box.
     * @param latMin The minimum latitude of the bounding box
     * @param latMax The maximum latitude of the bounding box
     * @param lngMin The minimum longitude of the bounding box
     * @param lngMax The maximum longitude of the bounding box
     * @returns The number of tiles in the bounding box
     */
    public countTilesInBounds(latMin: number, latMax: number, lngMin: number, lngMax: number): number {
        const minTile = this.getTile(latMin, lngMin);
        const maxTile = this.getTile(latMax, lngMax);
        return (maxTile[0] - minTile[0] + 1) * (maxTile[1] - minTile[1] + 1);
    }
}

export default TileCalculator;