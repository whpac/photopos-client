import MapTile from './entities/MapTile';
import Point from './entities/Point';
import PointList from './entities/PointList';
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
    }

    protected static registerObjectTypes() {
        StorageSerializer.registerObjectType(Point.getEntityType(), Point);
        StorageSerializer.registerObjectType(MapTile.getEntityType(), MapTile);
        StorageSerializer.registerObjectType(Session.getEntityType(), Session);
        StorageSerializer.registerObjectType(PointList.getEntityType(), PointList);
    }
}

export default Photopos;