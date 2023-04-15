import { useEffect, useState } from 'react';
import DialogBackdrop from './DialogBackdrop';
import DialogController from './DialogController';

function DialogManager(){
    const [dialog, setDialog] = useState<React.ReactNode | null>(null);

    useEffect(() => {
        const dialogController = DialogController.getInstance();
        const onDialogChanged = (controller: DialogController, dialogId: string | null) => {
            const dialog = controller.getDialog(dialogId);
            setDialog(dialog);
        };

        dialogController.onDialogChanged.addListener(onDialogChanged);

        return () => {
            dialogController.onDialogChanged.removeListener(onDialogChanged);
        };
    });

    if(dialog === null) {
        return null;
    }

    return <>
        <DialogBackdrop />
        {dialog}
    </>
}

export default DialogManager;