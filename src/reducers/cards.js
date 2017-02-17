function cards(state = [], action) {

    switch(action.type) {

        case 'ADD_CARD':

        return [ ...state, {
            profile: action.card.profile,
            checklist: action.card.checklist
        }];

        return state;

        default:
            return state;
    }
}

export default cards;
