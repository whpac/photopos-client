import './ActionAreaMenuButton.scss';

type ActionAreaMenuButtonProps = {
    children: JSX.Element,
    title: string,
    id: string,
    isActive?: boolean,
    onClick?: (id: string) => void,
};

function ActionAreaMenuButton({ children, title, id, isActive, onClick }: ActionAreaMenuButtonProps) {
    isActive ??= false;

    let cssClasses = ['action-area-menu-button'];
    if(isActive) {
        cssClasses.push('action-area-menu-button__selected');
    }

    const dispatchClick = () => {
        onClick?.(id);
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