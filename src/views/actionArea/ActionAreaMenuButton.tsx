import './ActionAreaMenuButton.scss'

type ActionAreaMenuButtonProps = {
    children: JSX.Element,
    title: string,
    id: string,
    isActive?: boolean,
    onClick?: (id: string) => void,
};

function ActionAreaMenuButton({ children, title, id, isActive, onClick }: ActionAreaMenuButtonProps){
    isActive ??= false;

    let cssClasses = [ 'action-area-menu-button' ];
    if (isActive) {
        cssClasses.push('action-area-menu-button__selected');
    }

    const dispatchClick = () => {
        // Don't dispatch click if the button is already active
        // TODO: Should this be handled by the parent? Deselecting the button?
        if(!isActive) onClick?.(id);
    };

    return (
        <li>
            <button className={cssClasses.join(' ')} title={title} onClick={dispatchClick}>
                {children}
            </button>
        </li>
    );
}

export default ActionAreaMenuButton;