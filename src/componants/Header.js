// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as modalActions from '../actions/modal';

class Header extends Component {

    modalOpen(){
        this.props.actions.modalToggle('open')
    }

    render(){
        return(
            <nav className="navbar navbar-inverse flex-row justify-content-between">
                <h1 className="navbar-brand mb-0">OverFlow</h1>
                <a className="navbar-text" href="#" onClick={this.modalOpen.bind(this)}>Settings</a>
            </nav>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        modal: state.modal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(modalActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
