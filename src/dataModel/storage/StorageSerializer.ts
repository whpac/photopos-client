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

    /**
     * Serializes the object to a JSON string.
     * @param object The StorageObject to serialize.
     * @returns A JSON string representing the object.
     */
    static serialize(object: StorageObject): string {
        return JSON.stringify(this.prepareToSerialize(object));
    }

    /**
     * Deserializes a JSON string into a StorageObject.
     * @param json A JSON string representing a StorageObject.
     * @returns A deserialized StorageObject.
     */
    static deserialize(json: string): StorageObject {
        const prepared = JSON.parse(json) as PreparedObject;
        return this.instantiate(prepared);
    }

    protected static isPrimitive(value: any): value is Primitive {
        return typeof value !== 'object' || value === null;
    }

    /**
     * Prepares an object for serialization.
     * @param object The StorageObject to prepare for serialization.
     */
    protected static prepareToSerialize(object: StorageObject): PreparedObject {
        let fields = object.getSerializableFields();
        let prepared = {} as ObjectOfPrmitives;

        for(let key in fields) {
            let value = fields[key];

            if(!Array.isArray(value)) {
                prepared[key] = this.prepareSingleToSerialize(value);
            } else {
                let preparedArray = [] as (PreparedObject[] | Primitive[]);
                for(let i = 0; i < value.length; i++) {
                    preparedArray[i] = this.prepareSingleToSerialize(value[i]);
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
     * Prepares a single value (not array) for serialization.
     * @param value A primitive or a StorageObject to prepare for serialization.
     * @returns A primitive or an ObjectOfPrmitives.
     */
    protected static prepareSingleToSerialize(value: StorageObject | Primitive): PreparedObject | Primitive {
        // If the value is a primitive, we don't need to serialize it.
        if(this.isPrimitive(value)) {
            return value;
        } else {
            return this.prepareToSerialize(value);
        }
    }

    /**
     * Instantiates a StorageObject from a PreparedObject.
     * @param prepared The value to instantiate.
     * @returns An instantiated StorageObject.
     */
    protected static instantiate(prepared: PreparedObject): StorageObject {
        let unprepared = {} as SerializableObject;
        for(let field in prepared.data) {
            let value = prepared.data[field];
            if(!Array.isArray(value)) {
                unprepared[field] = this.instantiateSingle(value);
            } else {
                let unpreparedArray = [] as (StorageObject[] | Primitive[]);
                for(let i = 0; i < value.length; i++) {
                    unpreparedArray[i] = this.instantiateSingle(value[i]);
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
     * Instantiates a single value (not array).
     * @param value A value to instantiate.
     * @returns The value if it is a primitive, or the instantiated StorageObject.
     */
    protected static instantiateSingle(value: PreparedObject | Primitive): StorageObject | Primitive {
        if(this.isPrimitive(value)) {
            return value;
        } else {
            return this.instantiate(value);
        }
    }
}

StorageSerializer.registerObjectType('Point', Point);
StorageSerializer.registerObjectType('MapTile', MapTile);

export default StorageSerializer;