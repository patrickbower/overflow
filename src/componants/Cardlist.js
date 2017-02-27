// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardActions from '../actions/cards';
import * as settingsActions from '../actions/settings';

class Cardlist extends Component {

    addCheckitem = () => {
        console.log('add check item');
    }

    checkitem = (listData, index, key) => {
        return (
            <div key={listData.id}>
                <div className="form-check mb-0">
                    <label className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input app__custom-control-input"
                            checked={ listData.state === 'complete' ? true : false }
                            onChange={ () => this.props.actions.checkItem(index, key) }
                        />
                        <span className="custom-control-indicator app__custom-control-indicator" />
                        <span className="custom-control-description app__custom-control-description">{listData.name}</span>
                      </label>
                </div>
            </div>
        )
    }

    cards = (cardsData) => {
        return Object.keys(cardsData).map(key => {
            return (
                <li key={key} className="app__card p-3 mb-3">
                    <form>
                        <fieldset>
                            <legend className="h5 mb-3">{ cardsData[key].name }</legend>
                            { cardsData[key].checklist.map((listData, index) => this.checkitem(listData, index, key)) }
                        </fieldset>
                    </form>
                    <div className="d-flex">
                        <span className="app__add-new-item-icon">+</span>
                        <input type="text" className="app__add-new-item-input w-100" placeholder="Add item"/>
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
