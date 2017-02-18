function cards(state = {}, action) {

    switch(action.type) {

        // new cards api call
        case 'CARDS_BUILD':
            return { ...state, [action.data.id] : action.data }

        // checklist item status
        case 'CARDS_CHECK_ITEM':
            return Object.assign(state, {
                checklist: Object.assign(state[action.id].checklist[action.index], {
                    state: action.newState
                })
            });

        // default
        default:
            return state;
    }
}

export default cards;
