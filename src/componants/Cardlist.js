// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardActions from '../actions/cards';
import * as settingsActions from '../actions/settings';

// utils
import * as Trello from '../utils/trello';

class Cardlist extends Component {

    constructor(props){
        super(props);
        this.cardKeyAddItem = null;
    }


    addCheckitem = (event, id, key) => {
        if (event.key === 'Enter' && event.target.value.length) {
            this.cardKeyAddItem = key;
            Trello.addCheckItem(id, event.target.value, this.addToStore.bind(this));
            event.target.value = '';
        }
    }

    addToStore = (data) => {
        this.props.actions.newCheckItem(data, this.cardKeyAddItem);
    }

    itemState = (index, key, state) => {

        if (state === 'complete') return false;

        let activeItemObj = this.props.cards[key].activeItem;

        // new item - either new or others have been unselected
        if (typeof activeItemObj === 'undefined' || activeItemObj === false) {
            this.props.actions.activeItem(index, key);
        // deselect an active item
        } else if (typeof activeItemObj === 'number' && activeItemObj === index) {
            this.props.actions.deselectActiveItem(index, key);
        // select differnt item - unselect one and select a differnt one
        } else if (typeof activeItemObj === 'number') {
            this.props.actions.changeActiveItem(index, key);
        }
    }

    // <input type="checkbox" className="app__card-check"
    //     checked={ listData.state === 'complete' ? true : false }
    //     onChange={ () => this.props.actions.checkItem(index, key) }
    // />

    checkitem = (listData, index, key) => {

        let crossIcon = listData.state === 'complete' ? <span className="icon-action icon-action--cross"></span> : '';
        let tickIcon = listData.activeItem ? <span className="icon-action icon-action--tick"></span> : '';

        return (
            <div
                key={listData.id}
                onClick={ () => this.itemState(index, key, listData.state) }
                className={`
                        app__card-item
                        ${listData.state === 'complete' ? 'complete' : ''}
                        ${listData.activeItem ? 'active' : ''}
                    `}
            >
                <div className={`app__card-background ${listData.activeItem ? 'active' : ''}`}></div>
                <div className="app__card-indicator"></div>
                <label className="app__card-label">{listData.name}</label>
                <a href="#"
                    onClick={ () => this.props.actions.checkItem(index, key) }
                    className="app__card-icon">
                        { crossIcon } { tickIcon }
                </a>
            </div>
        )
    }

    cards = (cardsData) => {
        return Object.keys(cardsData).map(key => {
            return (
                <li key={key}
                    className={`
                            app__card p-3 mb-3
                            ${typeof cardsData[key].activeItem === 'number' ? 'active' : ''}
                        `}
                    ref="card">
                    <form>
                        <fieldset>
                            <legend className="h5 mb-4 text-center font-weight-bold">{ cardsData[key].name }</legend>
                            { cardsData[key].checklist.map((listData, index) => this.checkitem(listData, index, key)) }
                        </fieldset>
                    </form>
                    <div className="d-flex">
                        <span className="app__add-new-item-icon">+</span>
                        <input type="text" className="app__add-new-item-input w-100" placeholder="Add item"
                            onKeyPress={ (event) => this.addCheckitem(event, cardsData[key].idChecklists[0], key) }
                            ref="addCheckitemInput"
                        />
                    </div>
                </li>
            )
        });
    }

    viewType = () => {
        let singleCardKey = this.props.settings.singleCardView;
        if (singleCardKey) {
            return { [singleCardKey]: this.props.cards[singleCardKey] }
        } else {
            return this.props.cards
        }
    }

    render(){
        let data = this.viewType();
        return(
            <ul>
                { this.cards(data) }
            </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cardlist);
