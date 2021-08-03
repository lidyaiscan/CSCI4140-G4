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
import AgentProcessPO from "./AgentProcessPO/AgentProcessPO";
import MakeNewPo from './MakeNewPo/MakeNewPo'
import ClientCreatePO from './ClientCreatePO/ClientCreatePO';
import AgentUpdatePart from './AgentUpdatePart/AgentUpdatePart';
import ClientListParts from './ClientListParts/ClientListParts';
import AgentListPOs from './AgentListPOs/AgentListPOs';
import AgentPOdetail from './AgentPOdetail/AgentPOdetail';
import AgentListParts from './AgentListParts/AgentListParts';
import AgentListClients from './AgentListClients/AgentListClients';

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
          <Route exact path='/agent/listpos' component={AgentListPOs} />  
          <Route exact path='/agent/podetail' component={AgentPOdetail} />          
          <Route exact path='/agent/processpo' component={AgentProcessPO} /> 
          <Route exact path='/makenewpo' component={MakeNewPo} />          
          <Route exact path='/client/listparts' component={ClientListParts} />
          <Route exact path='/agent/listparts' component={AgentListParts} />
          <Route exact path='/agent/listclients' component={AgentListClients} />
          <Route exact path='/agent/updatepart' component={AgentUpdatePart} />
        </Switch>
      </Router>
    </div>
    </>
  );
}

export default App;