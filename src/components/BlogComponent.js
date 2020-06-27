import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBlog } from '../redux/actions/blogActions';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class CreateBlog extends Component {
    state={
        title:'',
        subtitle:'',
        content: '',
        authorName: ''
    };

    //e is the event i.e. is passed to the event handler fucntion.
    handleChange = (e) => { 
        this.setState({
            [e.target.id]:e.target.value
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.props.createBlog(this.state);
        this.props.history.push('/');//to redirect afetr the project has been made..........
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
              <div className="container">
                <FormGroup className='row row-content'>
                  <Label for="title" className='col-12 col-md-2'>Title</Label>
                  <Input type="text" name="title" id="title" onChange={this.handleChange}   placeholder="Enter Title" className='col-12 col-md-9 offset-sm-1'/>
                </FormGroup>
                <FormGroup  className='row row-content'>
                  <Label for="subtitle" className='col-12 col-md-2'>Subtitle</Label>
                  <Input type="text" name="subtitle" id="subtitle" onChange={this.handleChange}  placeholder="Enter Subtitle" className='col-12 col-md-9 offset-sm-1'/>
                </FormGroup >
                <FormGroup className='row row-content'> 
                  <Label for="content" className='col-12 col-md-2'>Description</Label>
                  <Input type="textarea" name="content" id="content" onChange={this.handleChange}  className='col-12 col-md-9 offset-sm-1'/>
                </FormGroup>
                <FormGroup className='row row-content'>
                  <Label for="authorName" className='col-12 col-md-2'>Author Name</Label>
                  <Input type="text" name="authorName" id="authorName" onChange={this.handleChange}   placeholder="Enter your name" className='col-12 col-md-9 offset-sm-1'/>
                </FormGroup>
                <Button className='btn btn-secondary' type='submit'>Submit</Button>
              </div>
            </Form>
    )
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        createBlog: (blog)=> dispatch(createBlog(blog))
    }
}

export default connect(null , mapDispatchToProps)(CreateBlog);
//rce
