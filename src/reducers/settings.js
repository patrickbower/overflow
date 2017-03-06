function settings(state = {}, action) {

    switch(action.type) {

        // toggle
        case 'MODAL_TOGGLE':

            return { ...state,
                        open: action.toggle === 'open' ? true : false,
                        content: action.content 
                    }

        // single card view
        case 'SINGLE_CARD_VIEW':

            return { ...state, singleCardView: action.id }

        // default
        default:
            return state;
    }
}

export default settings;
