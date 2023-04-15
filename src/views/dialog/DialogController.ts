import EventListenerSet, { EventListener } from '../../dataModel/EventListenerSet';

class DialogController {
    protected dialogs: Map<string, React.ReactNode> = new Map();
    protected dialogsStack: string[] = [];

    public onDialogChanged: EventListenerSet<DialogController, string | null>;
    protected fireDialogChanged: EventListener<DialogController, string | null>;

    protected static instance: DialogController = new DialogController();

    /**
     * Returns the singleton instance of the DialogController
     */
    public static getInstance(): DialogController {
        return DialogController.instance;
    }

    constructor() {
        [this.onDialogChanged, this.fireDialogChanged] = EventListenerSet.create();
    }

    /**
     * Displays a dialog. If there's already a dialog with the same name, it will be replaced.
     * If there's already another dialog displayed, it will be hidden temporarily.
     * @param name The dialog name, used later to referece the dialog
     * @param dialog The dialog to display
     */
    public showDialog(name: string, dialog: React.ReactNode) {
        if(this.dialogs.has(name)) {
            this.dialogsStack = this.dialogsStack.filter((dialogName) => dialogName !== name);
        }

        this.dialogs.set(name, dialog);
        this.dialogsStack.push(name);
        this.fireDialogChanged(this, name);
    }

    /**
     * Closes the specified dialog. If there's another dialog waiting, it will be shown.
     * @param name The dialog name
     */
    public closeDialog(name: string) {
        this.dialogs.delete(name);
        this.dialogsStack = this.dialogsStack.filter((dialogName) => dialogName !== name);

        this.fireDialogChanged(this, this.getTopMostDialogName());
    }

    /**
     * Returns the name of the dialog that's on the top of the stack.
     */
    public getTopMostDialogName(): string | null {
        if(this.dialogsStack.length == 0) return null;
        return this.dialogsStack[this.dialogsStack.length - 1];
    }

    /**
     * Returns the dialog that's on the top of the stack.
     * @returns The top most dialog, or null if there's no dialog displayed
     */
    public getTopMostDialog(): React.ReactNode | null {
        const topMostDialogName = this.getTopMostDialogName();
        if(topMostDialogName === null) return null;

        return this.dialogs.get(topMostDialogName) ?? null;
    }

    /**
     * Finds a dialog by name
     * @param name The dialog name
     * @returns The dialog or null if it's not found
     */
    public getDialog(name: string | null): React.ReactNode | null {
        if(name === null) return null;
        return this.dialogs.get(name) ?? null;
    }
}

export default DialogController;