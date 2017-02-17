// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardActions from './actions/cards';

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

        trello.getCards(config.toDoListID, this.buildCardData.bind(this));
    }

    buildCardData(cardData) {

        cardData.map(cardDataItem => {

            let card = {};

            if (cardDataItem.idChecklists.length) {
                card.profile = cardDataItem;

                trello.getChecklist(cardDataItem.idChecklists[0]).then(checkListData => {
                    card.checklist = checkListData;
                    this.props.actions.addcard(card);
                });
            }

        })
    }

    render() {

        console.log('render', this.props.cards);

        return (
            <div className="container-fluid vertical-center">
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
        actions: bindActionCreators(cardActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
