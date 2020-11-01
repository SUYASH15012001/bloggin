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
        img: '',
        files:null,
        user:''
    };

    //e is the event i.e. is passed to the event handler fucntion.
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
      let file = this.state.files[0]
      // this.state.files && this.state.files.map( (file) => {
        let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
        let uploadTask = await storageRef.put(file)
        // uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,() => 
        // {
        //   let downloadURL = uploadTask.snapshot.downloadURL;
        //   console.log('download url fetched ',downloadURL);
        // })  
      // });
    }

    imgPush = async () => {
      // this.state.files && this.state.files.map(async (file) => {
        let storageRef = firebase.storage().ref();
        let spaceRef = storageRef.child('images/'+this.state.files[0].name)
        await storageRef.child('images/'+this.state.files[0].name).getDownloadURL().then((url) => {
          this.setState({
            img:[...this.state.img, url]
          })
        // })
      })
      await this.setState({
        files: [],
        user: firebase.auth().currentUser.email
      })
      console.log('it should have images',this.state)
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submit",this.state);
        await this.handleSaveImage();
        await this.imgPush();
        await this.props.createBlog(this.state);
        await this.props.history.push('/');
        // this.handleSaveImage().then(()=>setTimeout(() => this.imgPush()
        // .then(() => 
        //   setTimeout(() => this.props.createBlog(this.state),10000))
        //   ,10000))
        // setTimeout(() => this.props.history.push('/') , 24000) ;
      }
    render() {
        return (
          <div className="container">
            <h3>Create Your Blog&nbsp;&nbsp;<i class="fa fa-comments" aria-hidden="true"></i></h3>
            <hr/><br/>
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
                  <input type="file" name="files" id="files" onChange={(e) => {this.handleChangeImage(e.target.files)}} placeholder="Enter your name" className='col-12 col-md-9 offset-sm-1'/>
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