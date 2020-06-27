import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBlog } from '../redux/actions/blogActions';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import firebase from '../config/fbConfig'

class CreateBlog extends Component {
    state={
        title:'',
        subtitle:'',
        content: '',
        authorName: '',
        img: [],
        files: []
    };

    //e is the event i.e. is passed to the event handler fucntion.
    handleChange = (e) => { 
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleChangeImage = (file) => { 
      this.setState({
        files: [...this.state.files , ...file]
      })
    }

    handleSaveImage = () => {
      let bucketName = 'images';
      this.state.files && this.state.files.map( (file) => {
        let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
        let uploadTask = storageRef.put(file)
        uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,() => 
        {
          let downloadURL = uploadTask.snapshot.downloadURL;
        })  
      });
    }

    imgPush = () => {
      this.state.files && this.state.files.map((file) => {
        let storageRef = firebase.storage().ref();
        let spaceRef = storageRef.child('images/'+file.name)
        storageRef.child('images/'+file.name).getDownloadURL().then((url) => {
          this.setState({
            img:[...this.state.img, url]
          })
        })
      })
      this.setState({
        files: []
      })
      console.log('it should have images',this.state)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submit",this.state);
        this.handleSaveImage();
        setTimeout(() => this.imgPush(),1000);
        setTimeout(() => this.props.createBlog(this.state),2000);
        setTimeout(() => this.props.history.push('/') , 4000) ;
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
                <FormGroup className='row row-content'>
                  <Label for="files" className='col-12 col-md-2'>Images</Label>
                  <input type="file" multiple name="files" id="files" onChange={(e) => {this.handleChangeImage(e.target.files)}} placeholder="Enter your name" className='col-12 col-md-9 offset-sm-1'/>
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
