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
import logo from './styles/icons/logo.svg';

// utils
import config from './utils/config';
import * as Trello from './utils/trello';

// componants
import Cardlist from './componants/Cardlist';
import Header from './componants/Header';
import Modal from './componants/Modal';
import Clock from './componants/Clock';

class App extends Component {

    constructor(props){
        super(props);

        // init fetch for cards
        Trello.getCards(config.toDoListID, this.getCards.bind(this));
    }

    // fetch cards
    getCards(cardData) {
        // each card
        cardData.map(cardDataObj => {
            // get list
            return this.getChecklists(cardDataObj);
        })
    }

    // fetch checklists
    getChecklists(cardDataObj){

        // if checklist
        if (cardDataObj.idChecklists.length) {
            this.setChecklists(cardDataObj.idChecklists[0], cardDataObj);
        // no checklist
        } else {
            // create checklist, returning data to use
            // to go again and get the whole card
            Trello.createCheckList(cardDataObj.id, this.getCard.bind(this));
        }
    }

    // go again and get the whole card returning
    // back to the getChecklists function
    getCard(data){
        Trello.getCard(data.idCard, this.getChecklists.bind(this));
    }

    setChecklists(checklistId, cardDataObj){
        // get list
        Trello.getChecklist(checklistId).then(checkListData => {
            // add checklist to card obj
            let data = Object.assign(cardDataObj, { 'checklist': checkListData} );
            // add to store
            this.props.actions.makecards(data);
        });
    }

    render() {
        return (
            <div className="app">
                <Header />
                <Clock />
                <Modal getChecklists={this.getChecklists.bind(this)}/>
                <div className="app__card-container container-fluid vertical-center mb-5 mt-5">
                    <div className="row">
                        <div className="col col-12">
                            <Cardlist cards={this.props.cards} />
                        </div>
                    </div>
                </div>
                <footer className="footer app__footer">
                    <div className="container">
                        <div className="text-center mb-4">
                            <img src={ logo } className="app__logo"/>
                            <small className="app__small">
                                made for fun by <a href="http://www.patrickbower.com">Patrick Bower</a>
                            </small>
                        </div>
                    </div>
                </footer>
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
