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

        case 'CARDS_ACTIVE_ITEM':
            let newActiveItemState = JSON.parse(JSON.stringify(state));
            newActiveItemState[action.key].activeItem = action.index;
            newActiveItemState[action.key].checklist[action.index].activeItem = true;
            return newActiveItemState;

        case 'CARDS_CHANGE_ACTIVE_ITEM':
            let newChangeItemState = JSON.parse(JSON.stringify(state));
            let prevActiveItem = newChangeItemState[action.key].activeItem;
            // remove the checklist array item activeItem boolean
            delete newChangeItemState[action.key].checklist[prevActiveItem].activeItem;
            // set new checklist array item activeItem boolean
            newChangeItemState[action.key].checklist[action.index].activeItem = true;
            // change the cards activeItem index value
            newChangeItemState[action.key].activeItem = action.index;
            return newChangeItemState;

        case 'CARDS_DESELECT_ACTIVE_ITEM':
            let deselectItemState = JSON.parse(JSON.stringify(state));
            delete deselectItemState[action.key].checklist[action.index].activeItem;
            deselectItemState[action.key].activeItem = false;
            return deselectItemState;

        // default
        default:
            return state;
    }
}

export default cards;
