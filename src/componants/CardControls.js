// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardActions from '../actions/cards';

// utils
import * as trello from '../utils/trello';

class CardControls extends Component {

    render(){
        return(
            <div className="d-flex justify-content-center">
                <div className="btn-group btn-group-sm" role="group" aria-label="Small button group">
                    <button type="button" className="btn btn-secondary" tabIndex={1}>
                        <div className="icon-card-control icon-card-control--plus"></div>
                    </button>
                    <button type="button" className="btn btn-secondary" tabIndex={1}>
                        <div className="icon-card-control icon-card-control--tick"></div>
                    </button>
                    <button type="button" className="btn btn-secondary" tabIndex={1}>
                        <div className="icon-card-control icon-card-control--cross"></div>
                    </button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        cards: state.cards
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(cardActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardControls);
