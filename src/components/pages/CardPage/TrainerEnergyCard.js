import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import AddCard from '../../forms/AddCard';

const TrainerEnergyCard = (props) => (
    <Grid centered >
        <Grid.Row>
            <Grid.Column width={5} >
                <img src={props.card.image_url} alt={props.card.name} />
                <br />
                {props.card.price && <p>Average Price: {props.card.price}</p>}
                {props.addCard  && <AddCard card={props.card} />}
            </Grid.Column>
            <Grid.Column width={7} >
                <h4>{props.card.name}</h4>
                <h5>{props.card.text}</h5>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

TrainerEnergyCard.propTypes = {
    card: PropTypes.shape({
        image_url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        text: PropTypes.string,
        price: PropTypes.number
    }).isRequired,
    addCard: PropTypes.bool.isRequired
};

export default TrainerEnergyCard;