import StorageId from './StorageId';
import StorageJob from './StorageJob';
import StorageManager from './StorageManager';
import StorageObject from './StorageObject';
import StorageSerializer from './StorageSerializer';

class LocalStorageManager implements StorageManager {

    save(key: StorageId, value: StorageObject) {
        const serializedValue = StorageSerializer.serialize(value);
        localStorage.setItem(key.toString(), serializedValue);
    }

    async retrieve(key: StorageId): Promise<StorageObject | null> {
        let value = localStorage.getItem(key.toString());
        if(value === null) {
            return null;
        }
        return StorageSerializer.deserialize(value);
    }

    getQueue(): StorageJob[] {
        // Saving in local storage is synchronous, so there is no queue.
        return [];
    }
}

export default LocalStorageManager;