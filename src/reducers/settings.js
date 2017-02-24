function settings(state = {}, action) {

    switch(action.type) {

        // toggle
        case 'MODAL_TOGGLE':
            let newState = action.toggle === 'open' ? true : false;
            return {...state, open: newState}

        // default
        default:
            return state;
    }
}

export default settings;
