import StorageId from './StorageId';
import StorageJob from './StorageJob';
import StorageManager, { AnnotatedStorageObject, StorageSaveOptions } from './StorageManager';
import StorageObject from './StorageObject';

class HybridStorageManager implements StorageManager {
    protected readonly storageManagers: StorageManager[];

    constructor(storageManagers: StorageManager[]) {
        this.storageManagers = storageManagers;
    }

    save(key: StorageId, value: StorageObject, options?: StorageSaveOptions) {
        // Save the value in all the storage managers.
        for(const storageManager of this.storageManagers) {
            storageManager.save(key, value, options);
        }
    }

    async retrieve(key: StorageId): Promise<StorageObject | null> {
        const annotatedObject = await this.retrieveWithMetadata(key);
        return annotatedObject?.payload ?? null;
    }

    async retrieveWithMetadata(key: StorageId): Promise<AnnotatedStorageObject | null> {
        for(const storageManager of this.storageManagers) {
            const value = await storageManager.retrieveWithMetadata(key);

            if(value !== null) {
                if(storageManager !== this.storageManagers[0]) {
                    // Save the value in the first storage manager.
                    this.storageManagers[0].save(key, value.payload, value.metadata);
                }
                return value;
            }
        }
        return null;
    }

    getQueue(): StorageJob[] {
        // TODO: Implement this.
        return [];
    }
}

export default HybridStorageManager;