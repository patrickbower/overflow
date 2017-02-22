// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardActions from '../actions/cards';

class Header extends Component {

    render(){
        return(
            <nav className="navbar navbar-inverse flex-row justify-content-between">
                <h1 className="navbar-brand mb-0">OverFlow</h1>
                <a className="navbar-text" href="#">Settings</a>
            </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
