import cards from './cards';
import modal from './modal';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    cards, modal
});

export default rootReducer;
