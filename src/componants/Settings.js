// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardActions from '../actions/cards';
import * as modalActions from '../actions/modal';

// utils
import * as Trello from '../utils/trello';

class Settings extends Component {

    handleAddSubmit(event) {
        event.preventDefault();
        let title = this.refs.title.value;
        this.props.actions.addCard(title);
        Trello.makecard(title, this.closeModal.bind(this));
    }

    closeModal() {
        this.props.actions.modalToggle('close');
    }

    render(){

        console.log(this.props);

        return (
            <div>
                <form onSubmit={this.handleAddSubmit.bind(this)}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-9">
                                <input type="text" className="form-control" placeholder="Add a new card" ref="title"/>
                            </div>
                            <div className="col-3">
                                <button type="submit" className="btn btn-primary w-100">Add</button>
                            </div>
                        </div>
                    </div>
                </form>

                <form>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-9">
                            <select className="custom-select w-100">
                                <option defaultValue>Remove a card</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            </div>
                            <div className="col-3">
                                <button type="submit" className="btn btn-danger w-100">Remove</button>
                            </div>
                        </div>
                    </div>
                </form>

                <form>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-9">
                            <select className="custom-select w-100">
                                <option defaultValue>Current card</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            </div>
                            <div className="col-3">
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
        modal: state.modal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(cardActions, modalActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
