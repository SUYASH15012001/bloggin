const initState = {}

const blogReducer = (state = initState, action) => {
    switch(action.type) {
        case "CREATE_BLOG":
            console.log('Blog Created', action.blog);
            return state;
        case 'CREATE_BLOG_ERROR': 
            console.log('Error while creating blog', action.err)
            return state;
        default: return state;
    }
}

export default blogReducer;