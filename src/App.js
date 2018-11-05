import React, { Component } from 'react';
import './App.css';
import Index from './pages/index';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import allBogo from './pages/allBogo';
import Details from './pages/details';
import 'antd/dist/antd.css'; //antd 样式

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/home" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/allBogo" component={allBogo} />
              <Route path="/details" component={Details} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
