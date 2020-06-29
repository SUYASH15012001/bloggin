import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import createBlog from './BlogComponent';
import editComponent from './editComponent';
import firebase from '../config/fbConfig';


const myBlogComponent = () => {
    if(!firebase.auth().currentUser) 
    {   alert('We would love to link with you on GMail :)');
        return <Redirect to='/home'/>    
    }
    return (
        <div className="container">
            <div className="row row-content align-items-start">
                <div className="col-12 col-sm-5 offset-sm-1">
                    <Button color="info" className='btn btn-lg'>
                        <Link to='/createBlog' component={createBlog} className="text-white">Create a Project</Link>    
                    </Button>
                </div>
                <div className="col-12 col-sm-5 offset-sm-1">
                    <Button color="info" className='btn btn-lg'>
                        <Link to='/edit' component={editComponent} className="text-white">Edit your blogs</Link>    
                    </Button>                        
                </div>
            </div>
        </div>
    )
}

export default myBlogComponent;