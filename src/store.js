import { createStore } from 'redux';
import rootReducer from './reducers/index';

const defaultState = {
    'modal': {
        'open': false
    }
};

const store = createStore(rootReducer, defaultState);

export default store;
