import StorageId from './StorageId';
import StorageJob from './StorageJob';
import StorageManager, { AnnotatedStorageObject, StorageSaveOptions } from './StorageManager';
import StorageObject from './StorageObject';
import StorageSerializer from './StorageSerializer';

type LocalStorageEnvelope = {
    version: number;
    expires: number | null;
    payload: any;
};

class LocalStorageManager implements StorageManager {
    protected readonly FORMAT_VERSION = 1;

    save(key: StorageId, value: StorageObject, options?: StorageSaveOptions) {
        const expires = options?.expires ?? null;

        const serializedValue = StorageSerializer.serialize(value);
        const envelope: LocalStorageEnvelope = {
            version: 1,
            expires: expires,
            payload: serializedValue
        };
        const jsonValue = JSON.stringify(envelope);
        localStorage.setItem(key.toString(), jsonValue);
    }

    async retrieve(key: StorageId): Promise<StorageObject | null> {
        const annotatedObject = await this.retrieveWithMetadata(key);
        return annotatedObject?.payload ?? null;
    }

    async retrieveWithMetadata(key: StorageId): Promise<AnnotatedStorageObject | null> {
        let value = localStorage.getItem(key.toString());
        if(value === null) {
            return null;
        }
        const envelope = JSON.parse(value) as LocalStorageEnvelope;
        let isUpToDate = true;
        isUpToDate &&= (envelope.version === this.FORMAT_VERSION);
        isUpToDate &&= (envelope.expires === null || envelope.expires > Date.now());

        if(!isUpToDate) {
            // Don't keep outdated data.
            localStorage.removeItem(key.toString());
            return null;
        }

        const object = StorageSerializer.deserialize(envelope.payload);
        return {
            payload: object,
            metadata: {
                expires: envelope.expires
            }
        };
    }

    getQueue(): StorageJob[] {
        // Saving in local storage is synchronous, so there is no queue.
        return [];
    }
}

export default LocalStorageManager;