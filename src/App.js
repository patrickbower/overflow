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
import config from './utils/config';
import * as trello from './utils/trello';

// componants
import Cardlist from './componants/Cardlist';
import CardControls from './componants/CardControls';
import CardFilter from './componants/CardFilter';

class App extends Component {

    constructor(props){
        super(props);

        // init fetch for cards
        trello.getCards(config.toDoListID, this.getCards.bind(this));
    }

    // fetch cards
    getCards(cardData) {
        // each card
        cardData.map(cardDataItem => {
            // get list
            return this.getChecklists(cardDataItem);
        })
    }

    // fetch checklists
    getChecklists(cardDataItem){
        // ensure checklist
        if (cardDataItem.idChecklists.length) {
            // get list
            trello.getChecklist(cardDataItem.idChecklists[0]).then(checkListData => {
                // add checklist to card obj
                let data = Object.assign(cardDataItem, { 'checklist': checkListData} );
                // add to store
                this.props.actions.addcard(data);
            });
        }
    }

    render() {
        return (
            <div>
                <div className="row d-flex justify-content-end ml-0 mr-0">
                    <CardFilter />
                </div>
                <div className="container-fluid vertical-center mb-5 mt-5">
                    <div className="row">
                        <div className="col col-12">
                            <Cardlist cards={this.props.cards} />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col col-12">
                            <CardControls />
                        </div>
                    </div>
                </div>
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
