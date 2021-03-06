import React from 'react';
import PropTypes from 'prop-types';
import { Image, Card, Modal, Button, Icon, Header } from 'semantic-ui-react';

import { returnDate } from '../../../actions/deckbuilder';

const reduceSize = (string) => string.substring(0,9).concat('...');

const getDate = (isoDate) => returnDate(isoDate);

const inlineStyle = {
	modal: {
		display: "inline-block !important",
		position: "relative",
		marginTop: "auto !important",
		marginLeft: 'auto',
    marginRight: 'auto',
		top: "20%"
	}
};

const ModalExampleCloseIcon = (props) => (
  <Modal dimmer="blurring" style={inlineStyle.modal} size="mini" open={props.open} onClose={props.close} >
    <Header icon='info circle' content={`Deck details for: ${props.deck.name} ` } />
    <Modal.Content>
      <p>Date of creation: {getDate(props.deck.date)}</p>
      <p>Rotation: {props.deck.rotation}</p>
      <p>Votes: {props.deck.vote} </p>
      <p>Average cost to build this deck: {props.deck.deck.Cost}</p>
      <p>Pokémon cards count: {props.deck.deck.Count.Pokémon} </p>
      <p>Trainer cards count: {props.deck.deck.Count.Trainer} </p>
      <p>Energy cards count: {props.deck.deck.Count.Energy} </p>

    </Modal.Content>
    <Modal.Actions>
      <Button href={`deck/${props.deck._id}`} color='green' >
        <Icon name='computer' /> Visit Deck Page
      </Button>
      <Button href={`deck/edit/${props.deck._id}`} color='blue'>
        <Icon name='edit' /> Edit
      </Button>
    </Modal.Actions>
  </Modal>
)

ModalExampleCloseIcon.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  deck: PropTypes.shape({
    vote: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    rotation: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    deck: PropTypes.shape({
      Cost: PropTypes.string.isRequired,
      Count: PropTypes.shape({
        Pokémon: PropTypes.number.isRequired, 
        Trainer: PropTypes.number.isRequired, 
        Energy: PropTypes.number.isRequired
      }).isRequired,
      deckEnergyView: PropTypes.shape({
        pokemonType: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired
      })
    })
  }).isRequired
}

class DeckNav extends React.Component {
  state = {
    open: false
  }

  openModal = () => this.setState({ open: true });
  closeModal = () => this.setState({ open: false });

  render() {
    const { info } = this.props;
    const { deck, name, date, rotation, _id } = this.props.deck;
    const { open } = this.state;
    return (
      <Card link href={!info ? `deck/${_id}`: null}  onClick={info ? this.openModal : null} >
          <Image size="small" centered alt={deck.deckEnergyView.pokemonType} src={deck.deckEnergyView.imageUrl} />
          <Card.Content>
              <Card.Header textAlign="left" content={name.length > 12 ? reduceSize(name) : name} />
              <Card.Meta>
                  <span className='date'>
                      <p>{getDate(date)}</p>
                  </span>
              </Card.Meta>
              <Card.Description>
                  <p>{rotation}</p>
              </Card.Description>
          </Card.Content>
          { info && <ModalExampleCloseIcon deck={this.props.deck} open={open} close={this.closeModal}  /> }
      </Card>
    )
  }
}

DeckNav.propTypes = {
  deck: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    rotation: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    deck: PropTypes.shape({
      deckEnergyView: PropTypes.shape({
        pokemonType: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired
      })
    })
  }).isRequired,
  info: PropTypes.bool.isRequired
};




export default DeckNav;