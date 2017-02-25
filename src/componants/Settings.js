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
        Trello.makecard(title, this.addCardToStore.bind(this));
    }

    addCardToStore(data) {
        // call getChecklists(cardDataObj) in App.js
        // instead of...
        // this.props.actions.addCard(data);

        this.props.getChecklists(data)
    }

    currentCardSubmit = (event) => {
        event.preventDefault();
        let id = this.refs.cardSelect.value;
        this.props.actions.singleCardView(id);
        this.closeModal();
    }

    closeModal = () => {
        this.props.actions.modalToggle('close');
    }

    selectInputOptions = (cards) => {
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
                                <input type="text" ref="newCard" className="form-control mb-2" placeholder="Add a new card" />
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn btn-primary w-100">Add</button>
                            </div>
                        </div>
                    </div>
                </form>

                <form>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-9">
                                <select className="custom-select w-100 mb-2">
                                    <option defaultValue>Remove a card</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
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
                                <select className="custom-select w-100 mb-2" ref="cardSelect">
                                    <option defaultValue>Current card</option>
                                    { this.selectInputOptions(this.props.cards) }
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
