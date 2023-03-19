import StorageId from './StorageId';
import StorageJob from './StorageJob';
import StorageManager from './StorageManager';
import StorageObject from './StorageObject';

class LocalStorageManager implements StorageManager {

    save(key: StorageId, value: StorageObject) {
        // TODO: extend
        localStorage.setItem(key.toString(), JSON.stringify(value));
    }

    async retrieve(key: StorageId): Promise<StorageObject | null> {
        // TODO: construct the object from the JSON
        let value = localStorage.getItem(key.toString());
        return JSON.parse(value ?? '{}') as StorageObject;
    }

    getQueue(): StorageJob[] {
        return [];
    }
}

export default LocalStorageManager;