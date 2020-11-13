import React, { Component } from 'react';
import RenderCard from './cardComponent';
import {CardColumns} from "reactstrap"
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';


class HomeComponent extends Component {
    render() {
        return (
            <div className="container">
                <div className="row align-items-start">
                {this.props.blogs&&!this.props.blogs[0]  ? <h2>There aint anything much to display</h2>:null}
                    <CardColumns>
                    {    
                        
                        this.props.blogs && this.props.blogs.map((blog)=> {
                            return <RenderCard blogs={blog} />
                        })                    
                    }
                    </CardColumns>
                </div>
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
