// utils
import * as Trello from '../utils/trello';

function cards(state = {}, action) {

    switch(action.type) {

        // new cards api call
        case 'CARDS_BUILD':
            return { ...state, [action.data.id] : action.data }

        // checklist item status
        case 'CARDS_CHECK_ITEM':
            let CardsCheckItemState = JSON.parse(JSON.stringify(state));
            let CardsCheckItemStateObj = CardsCheckItemState[action.key].checklist[action.index];
            let newState = CardsCheckItemStateObj.state === 'complete' ? 'incomplete' : 'complete';
            CardsCheckItemState[action.key].checklist[action.index].state = newState;

            Trello.checkItem(
                action.key,
                CardsCheckItemStateObj.idChecklist,
                CardsCheckItemStateObj.id,
                newState
            );

            return CardsCheckItemState;

        case 'ADD_CARD':
            return { ...state, [action.data.id] : action.data }

        case 'NEW_CHECK_ITEM':
            let newCheckItemState = JSON.parse(JSON.stringify(state));
            let newCheckItemCheckList = Object.assign([], state[action.key].checklist.concat(action.data));
            newCheckItemState[action.key].checklist = newCheckItemCheckList;
            return newCheckItemState;

        case 'DELETE_CARD':
            let newDeleteCardState = JSON.parse(JSON.stringify(state));
            delete newDeleteCardState[action.key]
            return newDeleteCardState;

        // default
        default:
            return state;
    }
}

export default cards;
