import StorageId from './StorageId';
import StorageJob from './StorageJob';
import StorageObject from './StorageObject';

/**
 * Manager of a particular storage.
 */
interface StorageManager {

    /**
     * Saves an entity in the storage. If the entity already exists, it will be overwritten.
     * The saving process is asynchronous, so the entity may not be available immediately after the call.
     * 
     * This method returns immediately after placing the change in the queue.
     * Use the getQueue() method to get the queue of pending changes.
     * 
     * @param key The entity key under which the object will be stored.
     * @param value The entity to save.
     */
    save(key: StorageId, value: StorageObject): void;

    /**
     * Returns a promise that resolves to the entity with the given key.
     * 
     * May resolve instantenously if the entity is present locally or cause to wait for fetching
     * all the needed resources. If the entity is not present, null is returned.
     * 
     * @param key Key of the entity to retrieve.
     */
    retrieve(key: StorageId): Promise<StorageObject | null>;

    /**
     * Returns a queue of pending storage jobs.
     */
    getQueue(): StorageJob[];
}

export default StorageManager;