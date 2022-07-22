import React from 'react';
import './static/scss/app.scss';
import 'react-router-dom';
import { Route,Switch } from 'react-router-dom';
import Header from './components/presentation/header';
import LandingPage from './components/presentation/landingPage';
import GettingStarted from './components/presentation/gettingStarted';
import Login from './components/presentation/login';
import Register from './components/presentation/register';
import Contacts from './components/presentation/contact';
import Education from './components/presentation/education';
import Finalize from  './components/presentation/finalizePage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div>
     <Header></Header>

     <Switch>
          <PrivateRoute path="/education" component={Education}></PrivateRoute>
          <PrivateRoute path="/contact" component={Contacts}></PrivateRoute>
          <Route path="/getting-started" component={GettingStarted}></Route>
          <PrivateRoute path="/resume-templates" component={GettingStarted}></PrivateRoute>
          <PrivateRoute path="/finalize" component={Finalize}></PrivateRoute>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>             
          <Route path="/" component={LandingPage}></Route>
      </Switch>
    </div>
   
  );
}

export default App;
