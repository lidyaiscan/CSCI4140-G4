import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home/Home'
import POdetail from './POdetail/POdetail'
import Header from './Header/Header';

function App() {
  return (
    <>
    <div className="header">
      <Header/>
    </div>
    <div className="container">
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/podetail' component={POdetail} />

        </Switch>
      </Router>
    </div>
    </>
  );
}

export default App;