import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//components
import Navbar from './Components/layout/Navbar/Navbar';
import Home from './Components/pages/Home';
import About from './Components/pages/About';


class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={About} /> 
              <Route exact path="/home" component={Home} />
                
            </Switch>
            
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
