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

    render(){
        return (
            <div>
                <form onSubmit={ this.newCardSubmit }>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-9">
                                <input type="text" className="form-control mb-2" placeholder="Add a new card"
                                    ref="newCard"
                                />
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn btn-primary w-100">Add</button>
                            </div>
                        </div>
                    </div>
                </form>

                <form onSubmit={ this.deleteCardSubmit }>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-9">
                                <select className="custom-select w-100 mb-2"
                                        ref="cardDelete">
                                    <option>Remove a card</option>
                                    { this.inputOptions(this.props.cards) }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn btn-danger w-100">Remove</button>
                            </div>
                        </div>
                    </div>
                </form>

                <form onSubmit={ this.currentCardSubmit }>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-9">
                                <select className="custom-select w-100 mb-2"
                                        ref="cardSelect">
                                    <option>Current card</option>
                                    { this.inputOptions(this.props.cards) }
                                </select>
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn btn-success w-100">Confirm</button>
                            </div>
                        </div>
                    </div>
                </form>

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
