import MapTile from '../entities/MapTile';
import Point from '../entities/Point';
import StorageObject, { Primitive, SerializableObject } from './StorageObject';

type ObjectOfPrmitives = {
    [key: string]: Primitive | Primitive[] | PreparedObject | PreparedObject[];
};
type PreparedObject = {
    type: string;
    data: ObjectOfPrmitives;
};
type Instantiator = {
    instantiate(prepared: SerializableObject): StorageObject;
};

class StorageSerializer {
    protected static instantiators: Map<string, Instantiator> = new Map();

    /**
     * Registers a StorageObject type with the serializer and provides a
     * way to deserialize objects of the type.
     * @param type The type of object to instantiate.
     * @param instantiator An object used to instantiate the object.
     */
    public static registerObjectType(type: string, instantiator: Instantiator) {
        StorageSerializer.instantiators.set(type, instantiator);
    }

    protected static isPrimitive(value: any): value is Primitive {
        return typeof value !== 'object' || value === null;
    }

    /**
     * Serializes an object.
     * @param object The StorageObject to serialize.
     */
    public static serialize(object: StorageObject): PreparedObject {
        let fields = object.getSerializableFields();
        let prepared = {} as ObjectOfPrmitives;

        for(let key in fields) {
            let value = fields[key];

            if(!Array.isArray(value)) {
                prepared[key] = this.serializeSingle(value);
            } else {
                let preparedArray = [] as (PreparedObject[] | Primitive[]);
                for(let i = 0; i < value.length; i++) {
                    preparedArray[i] = this.serializeSingle(value[i]);
                }
                prepared[key] = preparedArray;
            }
        }

        return {
            type: object.getEntityType(),
            data: prepared
        };
    }

    /**
     * Serializes a single value (not array).
     * @param value A primitive or a StorageObject to serialize.
     * @returns A primitive or an ObjectOfPrmitives.
     */
    protected static serializeSingle(value: StorageObject | Primitive): PreparedObject | Primitive {
        // If the value is a primitive, we don't need to serialize it.
        if(this.isPrimitive(value)) {
            return value;
        } else {
            return this.serialize(value);
        }
    }

    /**
     * Deserailizes a StorageObject from a PreparedObject.
     * @param prepared The value to deserialize.
     * @returns A deserialized StorageObject.
     */
    public static deserialize(prepared: PreparedObject): StorageObject {
        let unprepared = {} as SerializableObject;
        for(let field in prepared.data) {
            let value = prepared.data[field];
            if(!Array.isArray(value)) {
                unprepared[field] = this.deserializeSingle(value);
            } else {
                let unpreparedArray = [] as (StorageObject[] | Primitive[]);
                for(let i = 0; i < value.length; i++) {
                    unpreparedArray[i] = this.deserializeSingle(value[i]);
                }
                unprepared[field] = unpreparedArray;
            }
        }

        const instantiator = this.instantiators.get(prepared.type);
        if(instantiator === undefined) {
            throw new Error(`No instantiator found for type ${prepared.type}`);
        }
        return instantiator.instantiate(unprepared);
    }

    /**
     * Deserializes a single value (not array).
     * @param value A value to deserialize.
     * @returns The value if it is a primitive, or the deserialized StorageObject.
     */
    protected static deserializeSingle(value: PreparedObject | Primitive): StorageObject | Primitive {
        if(this.isPrimitive(value)) {
            return value;
        } else {
            return this.deserialize(value);
        }
    }
}

StorageSerializer.registerObjectType('Point', Point);
StorageSerializer.registerObjectType('MapTile', MapTile);

export default StorageSerializer;