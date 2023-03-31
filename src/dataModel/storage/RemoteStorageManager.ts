import StorageId from './StorageId';
import StorageJob from './StorageJob';
import StorageManager, { StorageSaveOptions } from './StorageManager';
import StorageObject from './StorageObject';
import StorageSerializer from './StorageSerializer';

class RemoteStorageManager implements StorageManager {

    protected readonly API_URL = 'http://localhost/api/';

    save(key: StorageId, value: StorageObject, options?: StorageSaveOptions) {
        // TODO: Implement this.
    }

    async retrieve(key: StorageId): Promise<StorageObject | null> {
        try {
            const response = await fetch(this.API_URL + key.toString());
            if(!response.ok) return null;

            const data = await response.json();
            return StorageSerializer.deserialize(data);
        } catch(e) {
            console.error(e);
            return null;
        }
    }

    getQueue(): StorageJob[] {
        // TODO: Implement this.
        return [];
    }
}

export default RemoteStorageManager;