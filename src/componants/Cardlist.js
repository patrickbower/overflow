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
        // create new state
        let newState = data.state === 'complete' ? 'incomplete' : 'complete';
        // set state
        this.props.actions.checkItem(data, index, id, newState)
        // set trello
        trello.checkItem(id, data.idChecklist, data.id, newState);
    }

    checkitem(data, index, id){
        return (
            <li key={data.id}>
                <div className="form-check mb-0">
                    <label className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input app__custom-control-input"
                            defaultChecked={ data.state === 'complete' ? true : false }
                            onClick={ this.handleCheckbox.bind(this, data, index, id) }
                        />
                        <span className="custom-control-indicator app__custom-control-indicator" />
                        <span className="custom-control-description app__custom-control-description">{data.name}</span>
                      </label>
                </div>
            </li>
        )
    }

    cards(data){
        // each card obj
        return Object.keys(data).map(id => {
            // make card with each checklist arr
            return (
                <li key={id} className="app__card p-3 mb-3">
                    <h2 className="h5 mb-3">{ data[id].name }</h2>
                    <ul>
                        { data[id].checklist.map((data, index) => this.checkitem(data, index, id)) }
                    </ul>
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
