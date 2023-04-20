import StorageObject, { SerializableObject } from '../storage/StorageObject';

class Session implements StorageObject {

    protected sessionId: string | null;

    public constructor(sessionId: string | null) {
        this.sessionId = sessionId;
    }

    public getSessionId() {
        return this.sessionId;
    }

    getEntityType(): string {
        return Session.getEntityType();
    }

    getSerializableFields(): SerializableObject {
        return {
            sessionId: this.sessionId
        };
    }

    static instantiate(raw: SerializableObject): StorageObject {
        return new Session(
            raw.sessionId as string | null
        );
    }

    static getEntityType(): string {
        return 'Session';
    }
}

export default Session;