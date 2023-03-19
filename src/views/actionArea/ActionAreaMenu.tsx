import './ActionAreaMenu.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import ActionAreaMenuButton from './ActionAreaMenuButton';

function ActionAreaMenu() {
    return (
        <ul className="action-area-menu">
            <ActionAreaMenuButton key='nearby' title='Show nearby' isActive={true}>
                <FontAwesomeIcon icon={icon({name: 'map', style: 'regular'})} />
            </ActionAreaMenuButton>
            <ActionAreaMenuButton key='filter' title='Filter places'>
                <FontAwesomeIcon icon={icon({name: 'filter', style: 'solid'})} />
            </ActionAreaMenuButton>
            <ActionAreaMenuButton key='details' title='Selected place'>
                <FontAwesomeIcon icon={icon({name: 'location-dot', style: 'solid'})} />
            </ActionAreaMenuButton>
        </ul>
    );
}

export default ActionAreaMenu;