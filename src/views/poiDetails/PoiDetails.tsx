import './PoiDetails.scss';
import Point from '../../dataModel/entities/Point';
import ActionAreaContent from '../actionArea/ActionAreaContent';
import MapPoint from '../map/MapPoint';
import Button from '../forms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, brands, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import Photopos from '../../dataModel/Photopos';
import { useEffect, useState } from 'react';

type PoiDetailsProps = {
    point: MapPoint | null;
};

function PoiDetails({ point }: PoiDetailsProps) {
    let label: string;

    if(point?.hasLabel()) {
        label = point.getLabel();
    } else {
        label = 'Unnamed Point';
    }

    let description: string | null = null;
    let wikiArticle: string | null = null;
    let qId: string | null = null;

    if(point instanceof Point) {
        description = point.description;
        wikiArticle = point.wikiArticle;
        qId = point.qId;
    }

    let savedForLater = Photopos.forLaterPointsList;
    let isPointSavedForLater = false;
    if(point !== null) isPointSavedForLater = savedForLater.isOnList(point);

    const [stateForRefesh, setStateForRefresh] = useState(false);

    const removePointFromSavedForLater = () => {
        if(point === null) return;
        savedForLater.removeFromList(point);
        Photopos.sessionManager.savePointsList(savedForLater);
        setStateForRefresh(!stateForRefesh);
    };
    const addPointToSavedForLater = () => {
        if(point === null) return;
        savedForLater.addToList(point);
        Photopos.sessionManager.savePointsList(savedForLater);
        setStateForRefresh(!stateForRefesh);
    };

    useEffect(() => {
        const listener = () => {
            setStateForRefresh(!stateForRefesh);
        };

        // Refresh after logging in or out
        Photopos.sessionManager.onSessionIdChanged.addListener(listener);
        return () => {
            Photopos.sessionManager.onSessionIdChanged.removeListener(listener);
        };
    });

    let isLoggedIn = Photopos.sessionManager.isLoggedIn();


    return (
        <ActionAreaContent title="Point details">
            <div className="poi-details">
                <div className="poi-details--header">
                    <span className="poi-details--label">{label}</span>
                    {description !== null &&
                        <span className="poi-details--description">{description}</span>}
                </div>
                <ul className="poi-details--links">
                    {wikiArticle !== null &&
                        <li>
                            <Button
                                isLink={true}
                                href={'https://pl.wikipedia.org/wiki/' + wikiArticle}>
                                <FontAwesomeIcon icon={brands('wikipedia-w')} fixedWidth={true} />
                                Wikipedia article
                            </Button>
                        </li>}
                    {qId !== null &&
                        <li>
                            <Button
                                isLink={true}
                                href={'https://www.wikidata.org/wiki/' + qId}>
                                <FontAwesomeIcon icon={solid('barcode')} fixedWidth={true} />
                                Wikidata item
                            </Button>
                        </li>}
                </ul>
                <div className="poi-details--buttons">
                    <Button
                        isPrimary={true}
                        href="https://commons.wikimedia.org/wiki/Special:UploadWizard"
                        title="You will be redirected to Wikimedia Commons to upload your photo of the place">
                        <FontAwesomeIcon icon={solid('arrow-up-from-bracket')} />
                        Upload photo
                    </Button>
                    {isLoggedIn && !isPointSavedForLater &&
                        <Button onClick={addPointToSavedForLater}>
                            <FontAwesomeIcon icon={regular('bookmark')} />
                            Save for later
                        </Button>
                    }
                    {isLoggedIn && isPointSavedForLater &&
                        <Button onClick={removePointFromSavedForLater}>
                            <FontAwesomeIcon icon={solid('bookmark')} />
                            Saved for later
                        </Button>
                    }
                </div>
            </div>
        </ActionAreaContent>
    );
}

export default PoiDetails;