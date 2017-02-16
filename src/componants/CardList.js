// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardsActions from '../actions/cards';

// utils
import config from '../utils/config'
import * as trello from '../utils/trello'

class Cards extends Component {

    constructor(props){
        super(props);

        trello.getCards(config.toDoListID, this.storeList.bind(this));
    }

    storeList(data) {
        console.log(data);
    }

    render(){
        return(
            <p>Run fat boy, run</p>
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
        actions: bindActionCreators(cardsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
