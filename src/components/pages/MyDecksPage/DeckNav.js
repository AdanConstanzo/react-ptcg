import React from 'react';
import PropTypes from 'prop-types';
import { Image, Card } from 'semantic-ui-react';

import { returnDate } from '../../../actions/deckbuilder';

const reduceSize = (string) => string.substring(0,9).concat('...');

const getDate = (isoDate) => returnDate(isoDate);

const DeckNav = (props) => (
    <Card>
        <Image size="small" centered href={`deck/${props.deckId}`} alt={props.energyView.pokemonType} src={props.energyView.imageUrl} />
        <Card.Content>
            <Card.Header>
                <a href={`deck/${props.deckId}`} >{props.name.length > 12 ? reduceSize(props.name) : <h3>{props.name}</h3>}</a>
            </Card.Header>
            <Card.Meta>
                <span className='date'>
                    <p>{getDate(props.date)}</p>
                </span>
            </Card.Meta>
            <Card.Description>
                <p>{props.rotation}</p>
            </Card.Description>
        </Card.Content>
    </Card>
);

DeckNav.propTypes = {
   name: PropTypes.string.isRequired,
   deckId: PropTypes.string.isRequired,
   rotation: PropTypes.string.isRequired,
   energyView: PropTypes.shape({
       pokemonType: PropTypes.string.isRequired,
       imageUrl: PropTypes.string.isRequired
   }).isRequired,
   date: PropTypes.string.isRequired
};

export default DeckNav;