const initState = {};

const contactReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_FEEDBACK':
            console.log('feedback sent',action.feedback);
            return state;
        case 'CREATE_FEEDBACK_ERROR': 
            console.log('Error while sending feedback', action.err)
            return state;
        default:
            return state;
    }
}

export default contactReducer;