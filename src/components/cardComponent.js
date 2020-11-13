import React, { Component } from 'react';
import { CardImgOverlay,Card, CardImg, Modal,ModalBody,ModalHeader,CardTitle, CardSubtitle , CardFooter} from 'reactstrap';

class RenderCard extends Component {
    
    state={
        modal:false
    }

    toggle =()=> {
        this.setState({
            modal:!this.state.modal
        })
    }

    render(){
        const blog = this.props.blogs;
        return(
            <div className="col-12 mt-4" key={blog.id}>
                <Card onClick={this.toggle}>
                    <CardImg style={{opacity:'50%',height:'400px'}} src= {blog.img} alt='Card image' />
                    <CardImgOverlay style={{top:'auto'}}>
                        <CardTitle> {blog.title} </CardTitle>
                        <CardSubtitle> {blog.subtitle} </CardSubtitle>
                        {/* <CardText> {blog.content} </CardText> */}
                        <CardFooter> {blog.authorName}  </CardFooter>
                    </CardImgOverlay>
                </Card>
                <Modal isOpen={this.state.modal} toggle={this.toggle} size='lg' >
                    <ModalHeader toggle={this.toggle} className='text-white'>Blog content</ModalHeader>
                    <ModalBody style={{color:'grey'}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <CardImg height='300px' width='100%'  src= {blog.img} alt='Card image' />     
                                </div>
                                <div className="col-md-4 mt-auto" style={{textTransform:'capitalize'}}>
                                    <h2>{blog.title}</h2>
                                    <h4>{blog.subtitle}</h4>
                                </div>
                            </div>
                            <br/>
                            <div className="row">
                                <div className="col-12">
                                    <p>
                                        {blog.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ModalBody> 
                    <CardFooter>
                        <blockquote class="blockquote mb-0">
                            <p>Thanks for reading do visit again sometime.....</p>
                            <footer class="blockquote-footer"> {blog.authorName} <cite title="Source Title">@blog-e25f9</cite></footer>
                        </blockquote> 
                    </CardFooter>
                </Modal>
            </div>
        );
    }
}

export default RenderCard;