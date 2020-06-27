export const createBlog = (blog) => {
    return (dispatch, getState, {getFirebase , getFirestore }) => {
        const firestore = getFirestore;
        firestore().collection('blogs').add({
            ...blog,
            user: null,
            createdAt: new Date(),
        })
        .then(() => {
            dispatch({type: 'CREATE_BLOG', blog});            
        })
        .catch(err => {
            dispatch({type: 'CREATE_BLOG_ERROR', err})
        })

    }
}