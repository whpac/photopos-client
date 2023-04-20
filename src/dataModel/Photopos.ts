import SessionManager from './session/SessionManager';
import HybridStorageManager from './storage/HybridStorageManager';
import LocalStorageManager from './storage/LocalStorageManager';
import RemoteStorageManager from './storage/RemoteStorageManager';
import StorageManager from './storage/StorageManager';

class Photopos {

    protected static _storageManager: StorageManager;
    protected static _sessionManager: SessionManager;

    /**
     * The app's storage manager
     */
    public static get storageManager() {
        return Photopos._storageManager;
    }

    /**
     * The app's session manager
     */
    public static get sessionManager() {
        return Photopos._sessionManager;
    }

    static initialize() {
        Photopos._storageManager = new HybridStorageManager([
            new LocalStorageManager(),
            new RemoteStorageManager()
        ]);

        Photopos._sessionManager = new SessionManager();
    }
}

export default Photopos;