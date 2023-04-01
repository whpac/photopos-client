import StorageId from './StorageId';
import StorageJob from './StorageJob';
import StorageObject from './StorageObject';

export type StorageSaveOptions = {
    /** If the storage supports expiration, how long should the object be kept. */
    expires?: number | null;
};

export type AnnotatedStorageObject = {
    payload: StorageObject;
    metadata: StorageSaveOptions;
};

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
     * @param options Options for the saving process.
     */
    save(key: StorageId, value: StorageObject, options?: StorageSaveOptions): void;

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
     * Returns a promise that resolves to the entity with the given key. Attaches
     * metadata to the entity.
     * 
     * May resolve instantenously if the entity is present locally or cause to wait for fetching
     * all the needed resources. If the entity is not present, null is returned.
     * 
     * @param key Key of the entity to retrieve.
     */
    retrieveWithMetadata(key: StorageId): Promise<AnnotatedStorageObject | null>;

    /**
     * Returns a queue of pending storage jobs.
     */
    getQueue(): StorageJob[];
}

export default StorageManager;