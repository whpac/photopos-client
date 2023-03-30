export type EventListener<TSender, TEventData> = (sender: TSender, eventData: TEventData) => void;

class EventListenerSet<TSender, TEventData> {

    private listeners: Set<EventListener<TSender, TEventData>>;

    protected constructor() {
        this.listeners = new Set();
    }

    /**
     * Creates a new event listener set and returns it along with the fire function.
     * @returns A tuple with the EventListenerSet and the fire function.
     */
    public static create<TSender, TEventData>(): [EventListenerSet<TSender, TEventData>, EventListener<TSender, TEventData>] {
        const els = new EventListenerSet<TSender, TEventData>();
        const fire = els.fire.bind(els);
        return [els, fire];
    }

    public addListener(listener: EventListener<TSender, TEventData>): void {
        this.listeners.add(listener);
    }

    public removeListener(listener: EventListener<TSender, TEventData>): void {
        this.listeners.delete(listener);
    }

    protected fire(sender: TSender, eventData: TEventData): void {
        for(const listener of this.listeners) {
            listener(sender, eventData);
        }
    }
}

export default EventListenerSet;