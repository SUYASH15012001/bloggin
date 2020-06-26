import React , { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Contact extends Component {
  state=
  {
    name:'',
    email:'',
    message: ''
  };

//e is the event i.e. is passed to the event handler fucntion.
handleChange = (e) => { 
    this.setState({
        [e.target.id]:e.target.value
    })
}

handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(this.state));
    console.log(e);
}

  render() {
      return (
        <Form onSubmit={this.handleSubmit}>
          <div className="container">
            <FormGroup className='row row-content'>
              <Label for="name" className='col-12 col-md-2'>Name</Label>
              <Input type="text" name="name" id="name" onChange={this.handleChange}   placeholder="Enter your Name" className='col-12 col-md-9 offset-sm-1'/>
            </FormGroup>
            <FormGroup  className='row row-content'>
              <Label for="exampleEmail" className='col-12 col-md-2'>Email</Label>
              <Input type="email" name="email" id="email" onChange={this.handleChange}  placeholder="Your Email ID" className='col-12 col-md-9 offset-sm-1'/>
            </FormGroup >
            <FormGroup className='row row-content'> 
              <Label for="message" className='col-12 col-md-2'>Enter message</Label>
              <Input type="textarea" name="message" id="message" onChange={this.handleChange}  className='col-12 col-md-9 offset-sm-1'/>
            </FormGroup>
            <Button className='btn btn-secondary' type='submit'>Submit</Button>
          </div>
        </Form>

    );
  }

}

export default Contact;