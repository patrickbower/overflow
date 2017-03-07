function settings(state = {}, action) {

    switch(action.type) {

        // modal toggle
        case 'MODAL_TOGGLE':

            return  { ...state,
                        modalOpen: action.toggle === 'open' ? true : false,
                        content: action.content
                    }

        // timer toggle
        case 'TIMER_TOGGLE':
            return  { ...state,
                        clockVisible: action.toggle === 'show' ? true : false,
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
