import StorageId from './StorageId';
import StorageJob from './StorageJob';
import StorageManager, { StorageSaveOptions } from './StorageManager';
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
        for(const storageManager of this.storageManagers) {
            const value = await storageManager.retrieve(key);

            if(value !== null) {
                if(storageManager !== this.storageManagers[0]) {
                    // Save the value in all the first storage manager.
                    this.storageManagers[0].save(key, value);
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