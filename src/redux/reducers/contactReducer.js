const initState = {};

const contactReducer = (state = initState, action) => {
    switch(action.type){
        case 'CREATE_FEEDBACK':
            console.log('feedback sent',action.feedback);

        default:
            return state;
    }
}

export default contactReducer;