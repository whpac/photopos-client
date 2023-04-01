import StorageId from './StorageId';
import StorageJob from './StorageJob';
import StorageManager, { StorageSaveOptions } from './StorageManager';
import StorageObject from './StorageObject';
import StorageSerializer from './StorageSerializer';

class RemoteStorageManager implements StorageManager {

    protected readonly API_URL = 'http://localhost/photopos/server/api/api.php?resource=';

    save(key: StorageId, value: StorageObject, options?: StorageSaveOptions) {
        // TODO: Implement this.
    }

    async retrieve(key: StorageId): Promise<StorageObject | null> {
        try {
            const response = await fetch(this.API_URL + key.toString());
            if(!response.ok) return null;

            const data = await response.json();
            const success = data.success ?? false;
            if(!success) return null;

            const expires = data.expires ?? null;
            return StorageSerializer.deserialize(data.payload);
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