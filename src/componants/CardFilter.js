// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardActions from '../actions/cards';

class CardFilter extends Component {

    cardOptions(data){
        return Object.keys(data).map(id => {
            return (
                <option value={ data[id].name }>{ data[id].name }</option>
            )
        });
    }

    render(){
        return(
            <div className="mt-2 mr-2">
                <select className="custom-select">
                    <option selected>Open this select menu</option>
                    { this.cardOptions(this.props.cards) }
                </select>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardFilter);
