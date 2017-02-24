// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as settingsActions from '../actions/settings';

// components
import Settings from './Settings';

class Modal extends Component {


    // add 'show' className to .modal
    // add style={{display: 'block'}} to .modal
    // add 'modal-open' className to <body>
    // add <div className="modal-backdrop fade show"></div> html just before </body>
    // do i need aria and z-index shit ?


    closeModal(){
        this.props.actions.modalToggle('close')
    }

    render(){

        if (this.props.settings.open) {
            return(
                <div>
                <div className="modal-backdrop show" onClick={this.closeModal.bind(this)}></div>
                    <div className="modal d-block">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="text-muted">Settings</h5>
                                    <button type="button" className="close" onClick={this.closeModal.bind(this)}><span>&times;</span></button>
                                </div>
                                <div className="modal-body">
                                    <Settings />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return false
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
