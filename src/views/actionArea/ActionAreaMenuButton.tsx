import './ActionAreaMenuButton.scss'

function ActionAreaMenuButton({ children, title, isActive }:
    { children: JSX.Element, title: string, isActive?: boolean }){

    isActive ??= false;

    let cssClasses = [ 'action-area-menu-button' ];
    if (isActive) {
        cssClasses.push('action-area-menu-button__selected');
    }

    return (
        <li>
            <button className={cssClasses.join(' ')} title={title}>
                {children}
            </button>
        </li>
    );
}

export default ActionAreaMenuButton;