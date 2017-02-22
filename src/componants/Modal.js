// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as modalActions from '../actions/modal';

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

        if (this.props.modal.open) {
            return(
                <div>
                <div className="modal-backdrop show" onClick={this.closeModal.bind(this)}></div>
                    <div className="modal d-block">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="text-muted">Settings</h5>
                                    <button type="button" className="close" onClick={this.closeModal.bind(this)}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">

                                    <form>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-9">
                                                    <input type="text" className="form-control" placeholder="Add a new card" />
                                                </div>
                                                <div className="col-3">
                                                    <button type="submit" className="btn btn-primary w-100">Add</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <form>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-9">
                                                <select className="custom-select w-100">
                                                    <option defaultValue>Remove a card</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                                </div>
                                                <div className="col-3">
                                                    <button type="submit" className="btn btn-danger w-100">Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    <form>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-9">
                                                <select className="custom-select w-100">
                                                    <option defaultValue>Current card</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                                </div>
                                                <div className="col-3">
                                                    <button type="submit" className="btn btn-success w-100">Confirm</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

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
        modal: state.modal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(modalActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
