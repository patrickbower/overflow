// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardActions from '../actions/cards';
import * as settingsActions from '../actions/settings';

// utils
import * as Trello from '../utils/trello';

class Settings extends Component {

    newCardSubmit = (event) => {
        event.preventDefault();
        let title = this.refs.newCard.value;
        Trello.makecard(title, this.createCard.bind(this));
    }

    createCard = (data) => {
        // (getChecklists) method passed down from App
        this.props.getChecklists(data);
        this.props.actions.modalToggle('close');
    }

    currentCardSubmit = (event) => {
        event.preventDefault();
        let id = this.refs.cardSelect.value;
        this.props.actions.singleCardView(id);
        this.props.actions.modalToggle('close');
    }

    deleteCardSubmit = (event) => {
        event.preventDefault();
        let id = this.refs.cardDelete.value;
        this.props.actions.deleteCard(id);
        Trello.removeCard(id);
        this.props.actions.modalToggle('close');

    }

    closeModal = () => {
        this.props.actions.modalToggle('close');
    }

    inputOptions = (cards) => {
        return Object.keys(cards).map(key => {
            return (
                <option key={key} value={key}>{ cards[key].name }</option>
            )
        });
    }

    setContent(contentType) {
        switch (contentType) {
            case 'add-card':
            return (
                <form onSubmit={ this.newCardSubmit }>
                    <fieldset>
                        <legend className="app__form-legend">Add new card</legend>
                        <div className="row">
                            <div className="col-md-9">
                                <input type="text" className="form-control mb-2 app__form-control" placeholder="Add a new card"
                                    ref="newCard"
                                />
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn app__form-btn">Add</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            )
            break;
            case 'remove-card':
            return (
                <form onSubmit={ this.deleteCardSubmit }>
                    <fieldset>
                        <legend className="app__form-legend">Remove card</legend>
                        <div className="row">
                            <div className="col-md-9">
                                <select className="custom-select app__form-control w-100 mb-2"
                                        ref="cardDelete">
                                    <option>Remove a card</option>
                                    { this.inputOptions(this.props.cards) }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn app__form-btn">Remove</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            )
            break;
            case 'single-card-view':
            return (
                <form onSubmit={ this.currentCardSubmit }>
                    <fieldset>
                        <legend className="app__form-legend">Card in view</legend>
                        <div className="row">
                            <div className="col-md-9">
                                <select className="custom-select app__form-control w-100 mb-2"
                                        ref="cardSelect">
                                    <option>Current card</option>
                                    { this.inputOptions(this.props.cards) }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn app__form-btn">Confirm</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            )
            break;
        default:
            return (
                <p>Opps, There has been an mega error!</p>
            )
        }
    }

    render(){
        return (
            <div>
                { this.setContent(this.props.settings.content) }
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        cards: state.cards,
        settings: state.settings
    };
}

function mapDispatchToProps(dispatch) {
    const combineActions = Object.assign({}, cardActions, settingsActions);
    return {
        actions: bindActionCreators(combineActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
