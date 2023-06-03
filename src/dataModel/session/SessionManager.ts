import EventListenerSet, { EventListener } from '../EventListenerSet';
import Photopos from '../Photopos';
import PointList from '../entities/PointList';
import StorageId from '../storage/StorageId';
import StorageManager from '../storage/StorageManager';
import Session from './Session';

type LoginResponse = {
    success: true,
    sessionId: string;
} | {
    success: false,
    error: string;
};

class SessionManager {
    /** The session id for an anonymous user */
    protected static readonly SESSION_ID_ANON = null;
    /** Where the session id is stored */
    protected static readonly SESSION_STORAGE_KEY = new StorageId(Session.getEntityType(), 'local');
    /** Where the points list is stored */
    protected static readonly POINT_LIST_STORAGE_KEY = new StorageId(PointList.getEntityType(), 'forlater');

    /** The error code for a network error */
    public static readonly ERROR_NETWORK = 'session-manager/network';
    /** The error code for invalid credentials */
    public static readonly ERROR_CREDENTIALS = 'session-manager/credentials';

    /**
     * An event that's fired when the session id changes
     */
    public readonly onSessionIdChanged: EventListenerSet<SessionManager, string | null>;
    protected readonly fireSessionIdChanged: EventListener<SessionManager, string | null>;

    protected _sessionId: string | null = SessionManager.SESSION_ID_ANON;
    public get sessionId(): string | null {
        return this._sessionId;
    }

    protected storageManager: StorageManager;

    public constructor(storageManager: StorageManager) {
        this.storageManager = storageManager;

        [this.onSessionIdChanged, this.fireSessionIdChanged] = EventListenerSet.create();
    }

    /**
     * Loads the recently used session
     */
    public async loadRecent() {
        const session = await this.storageManager.retrieve(SessionManager.SESSION_STORAGE_KEY);
        if(session === null) return; // There's nothing to restore

        this._sessionId = (session as Session).getSessionId();

        // Load it early so that it's ready when the user needs it
        this.getPointsList();
    }

    /**
     * Attempts to log user in
     * @param username The username
     * @param password The password
     */
    public async logIn(username: string, password: string) {
        const requestData = { username, password };
        const response = await fetch('http://localhost/photopos/server/api/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if(!response.ok) {
            throw new Error(SessionManager.ERROR_NETWORK);
        }

        const data = await response.json() as LoginResponse;
        if(!data.success) {
            throw new Error(SessionManager.ERROR_CREDENTIALS);
        }

        const sessionId = data.sessionId;
        this._sessionId = sessionId;

        const session = new Session(sessionId);
        this.storageManager.save(SessionManager.SESSION_STORAGE_KEY, session);

        this.fireSessionIdChanged(this, this.sessionId);
        this.reloadPointsList();
    }

    public logOut() {
        this._sessionId = SessionManager.SESSION_ID_ANON;

        const session = new Session(this.sessionId);
        this.storageManager.save(SessionManager.SESSION_STORAGE_KEY, session);

        this.fireSessionIdChanged(this, this.sessionId);
        this.reloadPointsList();
        // TODO: Send a request to the server to invalidate the session
    }

    /**
     * Checks whether the user is logged in
     * @returns True if the user is logged in, false otherwise
     */
    public isLoggedIn() {
        return this.sessionId !== SessionManager.SESSION_ID_ANON;
    }

    /**
     * Returns the list of points saved for lated by the current user
     * @returns The points list for the current user
     */
    public async getPointsList(): Promise<PointList> {
        if(!this.isLoggedIn()) {
            return new PointList();
        }

        let pointsList = await this.storageManager.retrieve(SessionManager.POINT_LIST_STORAGE_KEY);
        if(pointsList === null) {
            return new PointList();
        }
        return pointsList as PointList;
    }

    public savePointsList(pointsList: PointList) {
        if(!this.isLoggedIn()) {
            return;
        }

        this.storageManager.save(SessionManager.POINT_LIST_STORAGE_KEY, pointsList);
    }

    public async reloadPointsList() {
        this.storageManager.remove(SessionManager.POINT_LIST_STORAGE_KEY);
        // Re-download the list
        let pointsList = await this.storageManager.retrieve(SessionManager.POINT_LIST_STORAGE_KEY) as PointList | null;
        if(pointsList === null) pointsList = new PointList();
        Photopos.forLaterPointsList.fromOtherList(pointsList);
    }
}

export default SessionManager;