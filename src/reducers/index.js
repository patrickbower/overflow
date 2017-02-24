import cards from './cards';
import settings from './settings';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    cards, settings
});

export default rootReducer;
