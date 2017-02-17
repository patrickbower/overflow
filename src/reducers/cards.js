function cards(state = {}, action) {

    switch(action.type) {

        // new cards api call
        case 'BUILD_CARDS':

        return { ...state, [action.data.id] : action.data }

        // default
        default:
            return state;
    }
}

export default cards;
