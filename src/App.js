import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, NavLink, Switch, Link, Route, Redirect } from 'react-router-dom';
import TableRender from './ObjectRendering/TableRender';
import SingleObject from './ObjectRendering/SingleObject';
import testData from './Facade/TestData';
import DataFacade from './Facade/DataFacade';
import LoginForm from './Authentication/LoginForm';
import User from './ObjectRendering/User';
import { Table, Button } from 'react-bootstrap';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], user: null, redirect: "" }
  }

  async componentDidMount() {
    await DataFacade.getData();
    this.setState({ data: testData }); //DataFacade.data[0].results
  }

  SetUser = (userInfo) => {
    this.setState({ user: userInfo });
  }

  Logout = () => {
    this.setState({ user: null });
    this.setState({ redirect: "/" }); //should be used
  }

  render() {   
    return (
      <Router>
        <div>
          <Header user={this.state.user} Logout={this.Logout} />
          <Switch>
            <Route
              exact path="/"
              component={Home}
            />
            <Route
              exact path="/tableRender"
              render={(matchUtil) => <TableRender data={this.state.data} match={matchUtil.match} history={matchUtil.history} />}
            />
            <Route
              path="/tableRender/:objectId"
              render={(matchUtil) => <SingleObject data={this.state.data} match={matchUtil.match} history={matchUtil.history} />}
            />
            <Route
              path="/authentication/loginForm"
              component={(matchUtil) => <LoginForm SetUser={this.SetUser} match={matchUtil.match} history={matchUtil.history} />}
            />
            <Route
              path="/user"
              component={(matchUtil) => <User user={this.state.user} match={matchUtil.match} history={matchUtil.history} />}
            />
            <Route
              path="/user/logout"
            />
            <Route
              component={NoMatch}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const Header = ({ user, Logout }) => {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      <li><NavLink activeClassName="active" to="/tableRender">renderTable</NavLink></li>
      <li><NavLink activeClassName="active" to="/authentication/loginForm">LoginForm</NavLink></li>
      {user &&
        <>
          <li style={{ float: "right" }}><Button onClick={() => Logout()}>Logout</Button></li>
          <li><NavLink activeClassName="active" to="/user">User</NavLink></li>
        </>
      }
    </ul>
  );
}

const Home = () => {
  return "Welcome to this page";
}


const NoMatch = () => {
  return (
    "hi from no match"
  );
}

export default App;
