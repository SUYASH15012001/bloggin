import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import {connect} from 'react-redux';


function RenderCard({blogs}) {
    return(
        <div className="row align-items-start">
            {blogs && blogs.map(blog => 
            {
                return (
                    <div className="col-12 col-md m-1" key={blog.id}>
                        <Card>
                            <CardImg src= {blog.img}  alt='Card image' />
                            <CardBody>
                                <CardTitle> {blog.title} </CardTitle>
                                <CardSubtitle> {blog.subtitle} </CardSubtitle>
                                <CardText> {blog.description} </CardText>
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
