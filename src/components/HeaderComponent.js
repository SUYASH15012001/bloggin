import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button}  from 'reactstrap';
import { NavLink } from 'react-router-dom';
import firebase from '../config/fbConfig';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isSignedIn: false
        };
        this.toggleNav = this.toggleNav.bind(this);

    }

    uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    componentDidMount =() => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({isSignedIn: !!user})
        })
    }

    render() {
        
        return(
            <React.Fragment>
                <Navbar dark expand="lg" className="bg-dark">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto">
                           <NavLink className="nav-link ml-auto  text-white ml-5" to="/home">
                                Blog-e25f9
                           </NavLink>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar id="navs">
                                <NavItem>
                                    <NavLink className="nav-link ml-5 navlink-style" to="/home" active>
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link ml-5 navlink-style" to="/myBlog">
                                        <span className="fa fa-info fa-lg"></span> Blog
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link ml-5 navlink-style" to="/contact">
                                        <span className="fa fa-address-card fa-lg"></span> Contact Us
                                    </NavLink>
                                </NavItem>
                                <NavItem className="ml-5 navlink-style">

                                    {
                                        this.state.isSignedIn ? 
                                        (
                                            <span>
                                                <NavbarBrand>
                                                    <img id='profilePic' src={firebase.auth().currentUser.photoURL} alt='uploaded'/>
                                                </NavbarBrand>
                                                <text className='text-secondary'>Welcome <strong>{firebase.auth().currentUser.displayName}</strong> </text>&nbsp;&nbsp;&nbsp;
                                                <Button onClick={() => firebase.auth().signOut()}>SignOut</Button>
                                            </span>
                                            ):
                                        (
                                            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
                                        )
                                    }                                    
                                </NavItem>
                            </Nav>
                            {/* <span id='loginlink'> 
                            {   
                                this.state.isSignedIn ? 
                                (
                                    <span>
                                        <NavbarBrand>
                                            <img id='profilePic' src={firebase.auth().currentUser.photoURL} alt='uploaded'/>
                                        </NavbarBrand>
                                        <text className='text-secondary'>Welcome <strong>{firebase.auth().currentUser.displayName}</strong> </text>&nbsp;&nbsp;&nbsp;
                                        <Button onClick={() => firebase.auth().signOut()}>SignOut</Button>
                                    </span>
                                    ):
                                (
                                    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
                                )
                            }</span> */}
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Commençons à bloguer</h1>
                                <p>We take inspiration from the World's best blogs, and create a unique fusion experience. Our earsmacking creations will tickle your sapiosexual senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default Header;