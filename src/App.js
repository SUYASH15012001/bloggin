import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/HeaderComponent';
import HomeComponent from './components/HomeComponent';
import Footer from './components/FooterComponent';

function App() {
  return (
    <div>
      <Header/>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component = {HomeComponent}/>
          </Switch>
        </div>  
      </BrowserRouter>
      <Footer/>
    </div>
    
  );
}

export default App;
