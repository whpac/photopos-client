import './ActionAreaMenu.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ActionAreaMenuButton from './ActionAreaMenuButton';
import { useState } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type ActionAreaMenuProps = {
    onMenuItemChange?: (key: string) => void,
    menuItems: ActionAreaMenuButtonDefinition[],
};
type ActionAreaMenuButtonDefinition = {
    key: string,
    title: string,
    icon: IconDefinition,
};

function ActionAreaMenu({ onMenuItemChange, menuItems }: ActionAreaMenuProps) {
    const [selectedItem, setSelectedItem] = useState('nearby');

    let onMenuItemClick = (key: string) => {
        setSelectedItem(key);
        onMenuItemChange?.(key);
    };

    return (
        <ul className="action-area-menu">
            {menuItems.map((item) => {
                return (
                    <ActionAreaMenuButton key={item.key} id={item.key}
                        title={item.title} isActive={item.key === selectedItem}
                        onClick={onMenuItemClick}>
                            <FontAwesomeIcon icon={item.icon} />
                    </ActionAreaMenuButton>
                );
            })}
        </ul>
    );
}

export default ActionAreaMenu;