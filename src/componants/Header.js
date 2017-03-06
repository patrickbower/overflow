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
                    <span className="app__settings-icon"></span>
                    <div className="app__settings-menu">
                        <span className="app__settings-menu-item">Add card</span>
                        <span className="app__settings-menu-item">Remove card</span>
                        <span className="app__settings-menu-item">Card view</span>
                        <span className="app__settings-menu-item">Hide timer</span>
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
