export const createFeedback = (feedback) => {
    
    return (dispatch, getState, {getFirebase , getFirestore }) => {
        const firestore = getFirestore;
        firestore().collection('feedbacks').add({
            ...feedback,
            createdAt: new Date(),
            authorName: 'Suyash Pratap Singh'
        })
        .then(() => {
            dispatch({type: 'CREATE_FEEDBACK', feedback});            
        })
        .catch(err => {
            dispatch({type: 'CREATE_FEEDBACK_ERROR', err})
        })

    }
}