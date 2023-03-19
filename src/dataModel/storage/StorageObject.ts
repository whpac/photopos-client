interface StorageObject {

    getEntityType(): string;
    getSerializableFields(): { [key: string]: string; };
}

export default StorageObject;