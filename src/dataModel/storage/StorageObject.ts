export type Primitive = string | number | boolean | null;
export type SerializableObject = {
    [key: string]: Primitive | Primitive[] | StorageObject | StorageObject[];
};

interface StorageObject {

    getEntityType(): string;
    getSerializableFields(): SerializableObject;
}

export default StorageObject;