import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBlog } from '../redux/actions/blogActions';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import firebase from '../config/fbConfig'
import { CubeGrid } from 'styled-loaders-react'
class CreateBlog extends Component {
    state={
        title:'',
        subtitle:'',
        content: '',
        authorName: '',
        img: '',
        files:null,
        user:'',
        isLoading:false
    };

    handleChange = (e) => { 
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleChangeImage = (file) => { 
      this.setState({
        files: file
      })
    }

    handleSaveImage = async () => {
      let bucketName = 'images';
      let file = this.state.files[0];
      let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
      await storageRef.put(file)
     
    }

    imgPush = async () => {
      let storageRef = firebase.storage().ref();
      await storageRef.child('images/'+this.state.files[0].name).getDownloadURL().then((url) => {
        this.setState({
          img:[...this.state.img, url]
        })
      })
      this.setState({
        files:null,
        user: firebase.auth().currentUser.email
      })
    }

    handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Form submit",this.state);
      this.setState({
        isLoading:true
      })
      await this.handleSaveImage();
      await this.imgPush();
      const blog = { 
        title:this.state.title,
        subtitle:this.state.subtitle,
        content: this.state.content,
        authorName: this.state.authorName,
        img: this.state.img,
        user:this.state.user
      }
      await this.props.createBlog(blog);
      await this.props.history.push('/');
    }

    render() {
      if(!!!firebase.auth().currentUser){
        window.location.href = '/'
      }
        return (
          this.state.isLoading?<CubeGrid/>:
          <div className="container">
            <h3>Create Your Blog&nbsp;&nbsp;<i class="fa fa-comments" aria-hidden="true"></i></h3>
            <hr/><br/>
            <Form onSubmit={this.handleSubmit}>
              <div className="container">
                <FormGroup className='row row-content'>
                  <Label for="title" className='col-12 col-md-2'>Title</Label>
                  <Input type="text" name="title" id="title" onChange={this.handleChange} required placeholder="Enter Title" className='col-12 col-md-9 offset-sm-1'/>
                </FormGroup>
                <FormGroup  className='row row-content'>
                  <Label for="subtitle" className='col-12 col-md-2'>Subtitle</Label>
                  <Input type="text" name="subtitle" id="subtitle" onChange={this.handleChange} required placeholder="Enter Subtitle" className='col-12 col-md-9 offset-sm-1'/>
                </FormGroup >
                <FormGroup className='row row-content'> 
                  <Label for="content" className='col-12 col-md-2'>Description</Label>
                  <Input type="textarea" name="content" id="content" onChange={this.handleChange} minLength='50' required className='col-12 col-md-9 offset-sm-1'/>
                </FormGroup>
                <FormGroup className='row row-content'>
                  <Label for="authorName" className='col-12 col-md-2'>Author Name</Label>
                  <Input type="text" name="authorName" id="authorName" onChange={this.handleChange} required   placeholder="Enter your name" className='col-12 col-md-9 offset-sm-1'/>
                </FormGroup>
                <FormGroup className='row row-content'>
                  <Label for="files" className='col-12 col-md-2'>Images</Label>
                  <input type="file" name="files" id="files" required onChange={(e) => {this.handleChangeImage(e.target.files)}} placeholder="Enter your name" className='col-12 col-md-9 offset-sm-1'/>
                </FormGroup>
                <Button className='btn btn-secondary' type='submit'>Submit</Button>
              </div>
            </Form>
          </div>
          
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