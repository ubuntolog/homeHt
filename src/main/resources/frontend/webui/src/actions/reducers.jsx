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

function registration(state = SI({}), action) {
    switch (action.type) {
        case actionTypes.REGISTRATION_SUBMISSION_SUCCESS:
            return SI(action.registration);
        case actionTypes.REGISTRATION_SUBMISSION_ERROR:
            return SI(action.registration);
        default:
            return state;
    }
}

function visitors(state = SI([]), action) {
    switch (action.type) {
        case actionTypes.FETCH_VISITORS_SUCCESS:
            return SI(action.visitors);
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    apiinfo,
    registration,
    visitors,

    form: formReducer,
    routing: routerReducer
});



export default rootReducer;
