import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import Registration from '../components/Registration';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => {
    return {
        apiinfo: state.apiinfo,
        registration: state.registration,
        visitors: state.visitors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export const RegistrationContainer = connect(mapStateToProps, mapDispatchToProps)(Registration);
