import MapAdapter from '../views/map/MapAdapter';
import MapControlChannel from '../views/map/MapControlChannel';
import MapTile from './entities/MapTile';
import Point from './entities/Point';
import PointList from './entities/PointList';
import ForLaterMapFilter from './mapData/ForLaterMapFilter';
import StorageMapAdapter from './mapData/StorageMapAdapter';
import Session from './session/Session';
import SessionManager from './session/SessionManager';
import HybridStorageManager from './storage/HybridStorageManager';
import LocalStorageManager from './storage/LocalStorageManager';
import RemoteStorageManager from './storage/RemoteStorageManager';
import StorageManager from './storage/StorageManager';
import StorageSerializer from './storage/StorageSerializer';

class Photopos {

    protected static initialized = false;
    protected static _storageManager: StorageManager;
    protected static _sessionManager: SessionManager;
    protected static _forLaterPointsList: PointList;

    protected static _mapAdapter: MapAdapter;
    protected static _mapFilter: ForLaterMapFilter;
    protected static _mapControlChannel: MapControlChannel;

    /**
     * The app's storage manager
     */
    public static get storageManager() {
        Photopos.initialize();

        return Photopos._storageManager;
    }

    /**
     * The app's session manager
     */
    public static get sessionManager() {
        Photopos.initialize();

        return Photopos._sessionManager;
    }

    /**
     * The user's "for later" points list
     */
    public static get forLaterPointsList() {
        Photopos.initialize();

        return Photopos._forLaterPointsList;
    }

    /**
     * The map adapter
     */
    public static get mapAdapter() {
        Photopos.initialize();

        return Photopos._mapAdapter;
    }

    /**
     * The map filter
     */
    public static get mapFilter() {
        Photopos.initialize();

        return Photopos._mapFilter;
    }

    /**
     * The map control channel
     */
    public static get mapControlChannel() {
        Photopos.initialize();

        return Photopos._mapControlChannel;
    }

    /**
     * Initializes the app.
     */
    public static async initialize() {
        if(Photopos.initialized) return;
        Photopos.initialized = true;

        // Initialize storage first, so that we can load our state
        Photopos._storageManager = new HybridStorageManager([
            new LocalStorageManager(),
            new RemoteStorageManager()
        ]);
        Photopos.registerObjectTypes();

        // Then start the session to have our user logged in and load the "for later" list
        Photopos._sessionManager = new SessionManager(Photopos._storageManager);
        await Photopos.sessionManager.loadRecent();
        Photopos._forLaterPointsList = await Photopos.sessionManager.getPointsList();

        // Initialize the map services
        this._mapAdapter = new StorageMapAdapter(Photopos.storageManager);
        this._mapControlChannel = new MapControlChannel();
        this._mapFilter = new ForLaterMapFilter(Photopos.forLaterPointsList);
        this._mapControlChannel.setMapFilter(this._mapFilter);
    }

    protected static registerObjectTypes() {
        StorageSerializer.registerObjectType(Point.getEntityType(), Point);
        StorageSerializer.registerObjectType(MapTile.getEntityType(), MapTile);
        StorageSerializer.registerObjectType(Session.getEntityType(), Session);
        StorageSerializer.registerObjectType(PointList.getEntityType(), PointList);
    }
}

export default Photopos;