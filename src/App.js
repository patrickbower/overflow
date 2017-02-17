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
import Cardlist from './componants/Cardlist'

class App extends Component {

    constructor(props){
        super(props);

        trello.getCards(config.toDoListID, this.getCards.bind(this));
    }

    getCards(cardData) {
        cardData.map(cardDataItem => {
            return this.getChecklists(cardDataItem);
        })
    }

    getChecklists(cardDataItem){
        if (cardDataItem.idChecklists.length) {
            trello.getChecklist(cardDataItem.idChecklists[0]).then(checkListData => {
                let data = Object.assign(cardDataItem, { 'checklist': checkListData} );
                this.props.actions.addcard(data);
            });
        }
    }

    render() {
        console.log(this.props);
        return (
            <div className="container-fluid vertical-center">
                <Cardlist cards={this.props.cards} />
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
