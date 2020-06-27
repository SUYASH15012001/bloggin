import blogReducer from './blogReducer';
import contactReducer from './contactReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootreducer = combineReducers({
    auth: authReducer,
    blog: blogReducer,
    contact: contactReducer,
    firestore: firestoreReducer
})

export default rootreducer