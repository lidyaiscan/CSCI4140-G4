import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home/Home'
import ListPOs from './ListPOs/ListPOs'
import ClientListPOs from './ClientListPOs/ClientListPOs'
import POdetail from './POdetail/POdetail'
import ClientPOdetail from './ClientPOdetail/ClientPOdetail'
import Header from './Header/Header';
import ProcessPO from "./ProcessPO/ProcessPO";
import MakeNewPo from './MakeNewPo/MakeNewPo'
import ClientCreatePO from './ClientCreatePO/ClientCreatePO';
import UpdatePart from './UpdatePart/UpdatePart';
import ListParts from './ListParts/ListParts';

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
          <Route exact path='/podetail' component={POdetail} />
          <Route exact path='/client/listpos' component={ClientListPOs} />
          <Route exact path='/client/create' component={ClientCreatePO} />
          <Route exact path='/client/podetail' component={ClientPOdetail} />          
          <Route exact path='/processpo' component={ProcessPO} />
          <Route exact path='/makenewpo' component={MakeNewPo} />
          <Route exact path='/updatepart' component={UpdatePart} />
          <Route exact path='/listparts' component={ListParts} />
        </Switch>
      </Router>
    </div>
    </>
  );
}

export default App;