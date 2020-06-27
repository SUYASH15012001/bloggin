export const createFeedback = (feedback) => {
    return (dispatch, getState) => {
        dispatch({type: 'CREATE_FEEDBACK', feedback});
    }
}