import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home/Home'
import ListPOs from './ListPOs/ListPOs'
import ClientListPOs from './ClientListPOs/ClientListPOs'
import POdetail from './POdetail/POdetail'
import Header from './Header/Header';
import MakeNewPo from './MakeNewPo/MakeNewPo'

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
          <Route exact path='/listpos' component={ListPOs} />
          <Route exact path='/client/listpos' component={ClientListPOs} />
          <Route exact path='/podetail' component={POdetail} />
          <Route exact path='/makenewpo' component={MakeNewPo} />
        </Switch>
      </Router>
    </div>
    </>
  );
}

export default App;