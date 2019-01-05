import axios from 'axios';
import Alert from 'react-s-alert';
import actionTypes from './actionTypes';
import {apiNames} from '../constants';

function errHandler(msg) {
    return function(err) {
        const alert = (msg) => {
            Alert.error(msg);
        };
        const response = err.response || {};
        if (response.status == 401) {
            alert("Please login");
        } else if (response.status == 403) {
            alert("Access denied. "+(response.data || ""));
        } else if (response.status == 504) {
            alert("The server does not respond (gateway timeout).");
        } else {
            msg = msg || "An error occurred while contacting the server.";
            alert(msg);
        }
    }
}

export function fetchApiInfo() {
    return function (dispatch, getState) {
        axios.get(apiNames.apiinfo).then(response => {
            dispatch({
                type: actionTypes.APIINFO_FETCH_SUCCESS,
                apiinfo: response.data
            });
        }).catch(errHandler());
    }
}

export function fetchVisitors() {
    return function (dispatch, getState) {
        axios.get(apiNames.user).then(response => {
            dispatch({
                type: actionTypes.FETCH_VISITORS_SUCCESS,
                visitors: response.data
            });
        }).catch(err => {
            errHandler("Could not retrieve the list of visitors")(err);
        });
    }
}

function registrationSubmissionSuccess(registration) {
    return {
        type: actionTypes.REGISTRATION_SUBMISSION_ERROR,
        registration: registration
    }
}

function registrationSubmissionError(registration) {
    return {
        type: actionTypes.REGISTRATION_SUBMISSION_ERROR,
        registration: registration
    }
}

export function submitRegistration(name, password, address, email, phone) {
    return function (dispatch, getState)  {
        const fd = new FormData();
        fd.append("name", name);
        fd.append("password", password);
        fd.append("address", address);
        fd.append("email", email);
        fd.append("phone", phone);
        axios.post(apiNames.user, fd).then(response => {
            dispatch(registrationSubmissionSuccess(response.data));
            Alert.success("You have successfully registered");            
        }).catch(err => {
            errHandler("Please check the form data")(err);
            dispatch(registrationSubmissionError(err.response.data));
        })
    }
}
