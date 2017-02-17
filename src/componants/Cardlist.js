// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardActions from '../actions/cards';

// componants

class Cardlist extends Component {

    card(data){
        return (
            <li key={data.id} className="app__card p-3 mb-3">
                <h2 className="h5 mb-3">{data.name}</h2>
                <ul>
                    { data.checklist.map(data => this.checkitem(data)) }
                </ul>
            </li>
        )
    }

    handleCheckbox(props){
        console.log('handleCheckbox');
    }

    checkitem(data){
        return (
            <li key={data.id}>
                <div className="form-check mb-0">
                    <label className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input"
                            defaultChecked={ data.state === 'complete' ? true : false }
                            onClick={ this.handleCheckbox.bind(null, this.props.cards) }
                        />
                        <span className="custom-control-indicator" />
                        <span className="custom-control-description">{data.name}</span>
                      </label>
                </div>
            </li>
        )
    }

    render(){
        return(
            <ul>
                card
            </ul>
        )
    }
}

// { this.props.cards.map(data => this.card(data)) }

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
