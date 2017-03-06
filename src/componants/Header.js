// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as settingsActions from '../actions/settings';

class Header extends Component {

    modalOpen = () => {
        this.props.actions.modalToggle('open')
    }

    // onClick={this.modalOpen.bind(this)}

    render(){
        return(
            <nav className="navbar app__navbar navbar-inverse flex-row justify-content-between">
                <h1 className="navbar-brand mb-0">OverFlow</h1>

                <div className="app__settings">
                    <a href="#" className="app__settings-icon"></a>
                    <div className="app__settings-menu">
                        <a href="#" onClick={this.modalOpen.bind(this)} className="app__settings-menu-item">Add card</a>
                        <a href="#" onClick={this.modalOpen.bind(this)} className="app__settings-menu-item">Remove card</a>
                        <a href="#" onClick={this.modalOpen.bind(this)} className="app__settings-menu-item">Card view</a>
                        <a href="#" onClick={this.modalOpen.bind(this)} className="app__settings-menu-item">Hide timer</a>
                    </div>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        settings: state.settings
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(settingsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
