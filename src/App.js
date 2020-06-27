import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/HeaderComponent';
import HomeComponent from './components/HomeComponent';
import Footer from './components/FooterComponent';
import Contact from './components/ContactComponent';

function App() {
  return (
      
      <BrowserRouter>  
        <div className="App">
          <Header/>
              <Switch>
                <Route exact path='/home' component = {HomeComponent}/>
                {/* <Route exact path='/home' component = {HomeComponent}/> */}
                <Route exact path='/contact' component = {Contact}/>
              </Switch>
          <Footer/>
        </div>
      </BrowserRouter>
    
  );
}

export default App;
