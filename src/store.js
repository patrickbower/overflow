import { createStore } from 'redux';
import rootReducer from './reducers/index';

const defaultState = {
    'settings': {
        'modalOpen': false,
        'clockVisible': true
    }
};

const store = createStore(rootReducer, defaultState);

export default store;
