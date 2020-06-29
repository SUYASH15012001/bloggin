import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import firebase from '../config/fbConfig'

function RenderCard({blogs, handleDelete, toggleModal}) {
    
    return(
        <div className="row align-items-start">
            {blogs && blogs.map(blog => 
            {if(blog.user === firebase.auth().currentUser.email){
                console.log('blog is', blog )
                return (
                    <div className="col-12 col-sm-3 mt-4" key={blog.id}>
                        <Card>
                            {blog.img && blog.img.map(blogImg => {
                                return (
                                    <CardImg key= {blog.img.indexOf(blogImg)} height='400px' 
                                    src= {blogImg} alt='Card image'/>
                                )})
                            }
                            <CardBody>
                                <CardTitle className='mb-2'> {blog.title} </CardTitle>
                                <Button outline color='danger' onClick={() => {handleDelete(blog.id) }}> <i className='fa fa-times'></i> </Button>
                                &nbsp;&nbsp;
                                <Button outline color='info' onClick={() => {toggleModal(blog.id)}}> <i className='fa fa-pencil'></i> </Button>
                            </CardBody>
                        </Card>
                    </div>
                )
            } 
            })}
        </div> 
        );
}

class editComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            currentBlog :null,
            title:'',
            subtitle:'',
            content: '',
            authorName: ''
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(blogID) {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            currentBlog: blogID
        });
    }

    handleSubmit =(e) => {
        this.toggleModal();
        e.preventDefault();
        console.log('submit state',this.state);
        firebase.firestore().collection('blogs').doc(this.state.currentBlog).update({"title": this.state.title,
        "subtitle":this.state.subtitle , "content":this.state.content, "authorName": this.state.authorName})
        .then(() => {
            console.log('Blog updated')
        })
        .catch(err => console.log('cannot update the blog!!'))
    }

    handleDelete = (blogID) => {
        firebase.firestore().collection('blogs').doc(blogID).delete();
    }

    handleChange = (e) => { 
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <h3> Your Blogs <i className="fa fa-cogs" aria-hidden="true"></i></h3>
                <hr/><br/>
                <RenderCard blogs={this.props.blogs} handleDelete={this.handleDelete} toggleModal={this.toggleModal}/>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Edit the details</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <div className="container">
                            <FormGroup className='row row-content'>
                                <Label for="title" className='col-12 col-md-2'>Title</Label>
                                <Input type="text" name="title" id="title" onChange={this.handleChange} placeholder="Enter Title" className='col-12 col-md-9 offset-sm-1'/>
                            </FormGroup>
                            <FormGroup  className='row row-content'>
                                <Label for="subtitle" className='col-12 col-md-2'>Subtitle</Label>
                                <Input type="text" name="subtitle" id="subtitle" onChange={this.handleChange} placeholder="Enter Subtitle" className='col-12 col-md-9 offset-sm-1'/>
                            </FormGroup >
                            <FormGroup className='row row-content'> 
                                <Label for="content" className='col-12 col-md-2'>Content</Label>
                                <Input type="textarea" name="content" id="content" onChange={this.handleChange} className='col-12 col-md-9 offset-sm-1'/>
                            </FormGroup>
                            <FormGroup className='row row-content'>
                                <Label for="authorName" className='col-12 col-md-2'>Author Name</Label>
                                <Input type="text" name="authorName" id="authorName" onChange={this.handleChange} placeholder="Enter your name" className='col-12 col-md-9 offset-sm-1'/>
                            </FormGroup>
                            <Button className='btn btn-secondary' type='submit' >Submit</Button>
                        </div>
                    </Form>

                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.firestore.ordered.blogs
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'blogs' }
    ])
)(editComponent);
