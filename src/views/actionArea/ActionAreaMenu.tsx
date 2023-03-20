import './ActionAreaMenu.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import ActionAreaMenuButton from './ActionAreaMenuButton';
import { useState } from 'react';

type ActionAreaMenuProps = {
    onMenuItemChange?: (key: string) => void,
};

function ActionAreaMenu({ onMenuItemChange }: ActionAreaMenuProps) {
    const menuItems = [
        {key: 'nearby', title: 'Show nearby', icon: icon({name: 'map', style: 'regular'})},
        {key: 'filter', title: 'Filter places', icon: icon({name: 'filter', style: 'solid'})},
        {key: 'details', title: 'Selected place', icon: icon({name: 'location-dot', style: 'solid'})},
    ];

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