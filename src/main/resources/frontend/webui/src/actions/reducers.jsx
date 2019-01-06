import SI from 'seamless-immutable';
import { combineReducers } from 'redux';
import actionTypes from '../actions/actionTypes';
import { reducer as formReducer } from 'redux-form';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

function apiinfo(state = SI({}), action) {
    switch (action.type) {
        case actionTypes.APIINFO_FETCH_SUCCESS:
            return SI(action.apiinfo);
        default:
            return state;
    }
}

function bookings(state = SI([]), action) {
    switch (action.type) {
        case actionTypes.FETCH_BOOKINGS_SUCCESS:
            return SI(action.bookings);
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    apiinfo,
    bookings,

    form: formReducer,
    routing: routerReducer
});

export default rootReducer;
