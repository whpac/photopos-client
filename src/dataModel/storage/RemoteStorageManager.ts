import StorageId from './StorageId';
import StorageJob from './StorageJob';
import StorageManager, { AnnotatedStorageObject, StorageSaveOptions } from './StorageManager';
import StorageObject from './StorageObject';
import StorageSerializer from './StorageSerializer';

class RemoteStorageManager implements StorageManager {

    protected readonly API_URL = 'http://localhost/photopos/server/api/api.php?resource=';

    save(key: StorageId, value: StorageObject, options?: StorageSaveOptions) {
        // TODO: Implement this.
    }

    async retrieve(key: StorageId): Promise<StorageObject | null> {
        const annotatedObject = await this.retrieveWithMetadata(key);
        return annotatedObject?.payload ?? null;
    }

    async retrieveWithMetadata(key: StorageId): Promise<AnnotatedStorageObject | null> {
        try {
            const response = await fetch(this.API_URL + key.toString());
            if(!response.ok) return null;

            const data = await response.json();
            const success = data.success ?? false;
            if(!success) return null;

            const expires = data.expires ?? null;
            const payload = StorageSerializer.deserialize(data.payload);
            return {
                payload: payload,
                metadata: {
                    expires: expires
                }
            };
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