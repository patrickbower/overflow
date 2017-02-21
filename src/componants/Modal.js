// react
import React, { Component } from 'react';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardActions from '../actions/cards';

class Modal extends Component {


    // add 'show' className to .modal
    // add style={{display: 'block'}} to .modal
    // add 'modal-open' className to <body>
    // add <div className="modal-backdrop fade show"></div> html just before </body>
    // do i need aria and z-index shit ?

    render(){
        return(
            <div>
                <div className="modal fade show" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{display: 'block'}}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade show"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
