import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle , CardFooter} from 'reactstrap';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

function RenderCard({blogs}) {
    return(
        <div className="row align-items-start">
            {blogs && blogs.map(blog => 
            {
                return (
                    <div className="col-12 col-sm-10 offset-sm-1 mt-4" key={blog.id}>
                        <Card>
                            {blog.img && blog.img.map(blogImg => {
                                return (
                                    <CardImg key= {blog.img.indexOf(blogImg)} height='400px' 
                                    src= {blogImg} alt='Card image' />
                                )})
                            }
                            <CardBody>
                                <CardTitle> {blog.title} </CardTitle>
                                <CardSubtitle> {blog.subtitle} </CardSubtitle>
                                <CardText> {blog.content} </CardText>
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
        return (
            <div className="container">
                <RenderCard blogs={this.props.blogs} />
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
)(HomeComponent);
