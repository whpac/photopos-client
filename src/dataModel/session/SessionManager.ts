import EventListenerSet, { EventListener } from '../EventListenerSet';

type LoginResponse = {
    success: true,
    sessionId: string;
} | {
    success: false,
    error: string;
};

class SessionManager {
    /** The session id for an anonymous user */
    public static readonly SESSION_ID_ANON = null;

    /** The error code for a network error */
    public static readonly ERROR_NETWORK = 'session-manager/network';
    /** The error code for invalid credentials */
    public static readonly ERROR_CREDENTIALS = 'session-manager/credentials';

    protected static instance: SessionManager | null = null;

    /**
     * An event that's fired when the session id changes
     */
    public readonly onSessionIdChanged: EventListenerSet<SessionManager, string | null>;
    protected readonly fireSessionIdChanged: EventListener<SessionManager, string | null>;

    protected _sessionId: string | null = SessionManager.SESSION_ID_ANON;
    public get sessionId(): string | null {
        return this._sessionId;
    }

    protected constructor() {
        [this.onSessionIdChanged, this.fireSessionIdChanged] = EventListenerSet.create();
    }

    /**
     * Returns an instance of the SessionManager
     */
    public static getInstance() {
        if(SessionManager.instance === null) {
            SessionManager.instance = new SessionManager();
        }
        return SessionManager.instance;
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
        // TODO: Save session id to local storage
        this.fireSessionIdChanged(this, this._sessionId);
    }

    public logOut() {
        this._sessionId = SessionManager.SESSION_ID_ANON;
        this.fireSessionIdChanged(this, this._sessionId);
        // TODO: Send a request to the server to invalidate the session
    }
}

export default SessionManager;