// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as settingsActions from '../actions/settings';
import logo from '../styles/icons/logo.svg'

class Header extends Component {

    modalOpen = (content) => {
        this.props.actions.modalToggle(content, 'open');
    }

    timerToggle = () => {
        if (this.props.settings.clockVisible) {
            this.props.actions.timerToggle('hide');
        } else {
            this.props.actions.timerToggle('show');
        }
    }

    render(){
        return(
            <nav className="navbar app__navbar navbar-inverse flex-row justify-content-between">
                <div>
                    <img src={ logo } className="app__logo"/>
                    <small className="app__small">
                        made for fun by <a href="www.patrickbower.com">Patrick Bower</a>
                    </small>
                </div>

                <div className="app__settings">
                    <a href="#" className="app__settings-icon"></a>
                    <div className="app__settings-menu">
                        <a href="#" onClick={() => this.modalOpen('add-card')} className="app__settings-menu-item">Add card</a>
                        <a href="#" onClick={() => this.modalOpen('remove-card')} className="app__settings-menu-item">Remove card</a>
                        <a href="#" onClick={() => this.modalOpen('single-card-view')} className="app__settings-menu-item">Card view</a>
                        <a href="#" onClick={() => this.timerToggle()} className="app__settings-menu-item">
                            {`${this.props.settings.clockVisible ? 'Hide' : 'Show'}`} timer
                        </a>
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
