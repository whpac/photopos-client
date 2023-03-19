/**
 * A unique identifier for a storage entity.
 */
class StorageId {

    /** The type of the described entity. */
    public readonly entityType: string;

    /** The entity id. Doesn't have to be unique across diferrent types. */
    public readonly entityId: string;

    constructor(entityType: string, entityId: string) {
        this.entityType = entityType;
        this.entityId = entityId;
    }
}

export default StorageId;