import MapTile from './entities/MapTile';
import Point from './entities/Point';
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

    public static initialize() {
        if(Photopos.initialized) return;

        Photopos._storageManager = new HybridStorageManager([
            new LocalStorageManager(),
            new RemoteStorageManager()
        ]);

        Photopos._sessionManager = new SessionManager(Photopos._storageManager);

        Photopos.registerObjectTypes();
    }

    protected static registerObjectTypes() {
        StorageSerializer.registerObjectType(Point.getEntityType(), Point);
        StorageSerializer.registerObjectType(MapTile.getEntityType(), MapTile);
        StorageSerializer.registerObjectType(Session.getEntityType(), Session);
    }
}

export default Photopos;