import blogReducer from './blogReducer';
import contactReducer from './contactReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'; 
import { firebaseReducer } from 'react-redux-firebase';

const rootreducer = combineReducers({
    auth: authReducer,
    blog: blogReducer,
    contact: contactReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootreducer