// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardActions from '../actions/cards';

// utils
import * as trello from '../utils/trello';

class Cardlist extends Component {

    handleCheckbox(data, index, id){
        let newState = data.state === 'complete' ? 'incomplete' : 'complete';
        this.props.actions.checkItem(data, index, id, newState)
        trello.checkItem(id, data.idChecklist, data.id, newState);
    }

    checkItem = (id) => {
        console.log(id);
    }

    checkitem(listData){
        return (
            <div key={listData.id}>
                <div className="form-check mb-0">
                    <label className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input app__custom-control-input"
                            checked={ listData.state === 'complete' ? true : false }
                            onChange={ () => this.checkItem(listData) }
                        />
                        <span className="custom-control-indicator app__custom-control-indicator" />
                        <span className="custom-control-description app__custom-control-description">{listData.name}</span>
                      </label>
                </div>
            </div>
        )
    }

    cards(cardsData){
        return Object.keys(cardsData).map(key => {
            console.log(key);
            return (
                <li key={key} className="app__card p-3 mb-3">
                    <form>
                        <fieldset>
                            <legend className="h5 mb-3">{ cardsData[key].name }</legend>
                            { cardsData[key].checklist.map(listData => this.checkitem(listData)) }
                        </fieldset>
                    </form>
                </li>
            )
        });
    }

    render(){
        return(
            <ul>
                { this.cards(this.props.cards) }
            </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cardlist);
