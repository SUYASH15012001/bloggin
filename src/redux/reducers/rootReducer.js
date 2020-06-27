import blogReducer from './blogReducer';
import contactReducer from './contactReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';

const rootreducer = combineReducers({
    auth: authReducer,
    blog: blogReducer,
    contact: contactReducer
})

export default rootreducer