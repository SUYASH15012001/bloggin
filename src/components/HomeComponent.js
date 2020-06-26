import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';



function RenderCard({item, isLoading, errMess}) {
    return(
        <Card>
            <CardImg src='public/logo192.png' alt='Card image' />
            <CardBody>
                <CardTitle>Title</CardTitle>
                <CardSubtitle>CardSubtitle</CardSubtitle>
                <CardText>Description</CardText>
            </CardBody>
        </Card>
    );
}

class HomeComponent extends Component {
    render() {
        return (
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-12 col-md m-1">
                        <RenderCard/>
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard/>
                    </div>
                    <div className="col-12 col-md m-1">
                        <RenderCard/>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeComponent
