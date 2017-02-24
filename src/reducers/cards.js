// utils
import * as Trello from '../utils/trello';

function cards(state = {}, action) {

    switch(action.type) {

        // new cards api call
        case 'CARDS_BUILD':
            return { ...state, [action.data.id] : action.data }

        // checklist item status
        case 'CARDS_CHECK_ITEM':

            // copy object
            let cloneState = JSON.parse(JSON.stringify(state));

            // get check object
            let ChecklistObj = cloneState[action.key].checklist[action.index];

            // create new state
            let newState = ChecklistObj.state === 'complete' ? 'incomplete' : 'complete';

            // set new state in cloned object
            cloneState[action.key].checklist[action.index].state = newState;

            // ping trello api
            Trello.checkItem(
                action.key,
                ChecklistObj.idChecklist,
                ChecklistObj.id,
                newState
            );

            return cloneState;

        case 'ADD_CARD':
            console.log('add cards', action.title);
            return state;

        // default
        default:
            return state;
    }
}

export default cards;
