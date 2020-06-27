import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle , CardFooter} from 'reactstrap';
import {connect} from 'react-redux';


function RenderCard({blogs}) {
    return(
        <div className="row align-items-start">
            {blogs && blogs.map(blog => 
            {
                return (
                    <div className="col-12 col-sm-10 offset-sm-1 mt-4" key={blog.id}>
                        <Card>
                            <CardImg height='400px' src= 'https://firebasestorage.googleapis.com/v0/b/blog-e25f9.appspot.com/o/images%2Futhappizza.png?alt=media&token=98b6e4e5-2778-423a-9a7f-a16afc6b9d4c'  alt='Card image' />
                            <CardBody>
                                <CardTitle> {blog.title} </CardTitle>
                                <CardSubtitle> {blog.subtitle} </CardSubtitle>
                                <CardText> {blog.description} </CardText>
                                <CardFooter> {blog.authorName}  </CardFooter>
                            </CardBody>
                        </Card>
                    </div>
                )
            })}
        </div>
        
        );
}

class HomeComponent extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="container">
                <RenderCard blogs={this.props.blogs} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blog.blogs
    }
}

export default connect(mapStateToProps)(HomeComponent);
