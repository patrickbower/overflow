// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardsActions from './actions/cards';

// styles
import './styles/reset.css';
import './styles/bootstrap.css';
import './styles/app.css';

// utils
import config from './utils/config'
import * as trello from './utils/trello'

// componants

class App extends Component {

    constructor(props){
        super(props);

        trello.getCards(config.toDoListID, this.storeList.bind(this));
    }

    storeList(data) {
        console.log(data);
    }

    render() {
        return (
            <div className="app fluid-container">
                <p>lets go</p>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
