import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, NavLink, Switch, Link, Route } from 'react-router-dom';
import TableRender from './ObjectRendering/TableRender';
import SingleObject from './ObjectRendering/SingleObject';
import testData from './Facade/TestData';
import DataFacade from './Facade/DataFacade';
import LoginForm from './Authentication/LoginForm';
import User from './ObjectRendering/User';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { data: [], user: null }
  }

  async componentDidMount() {
    await DataFacade.getData();
    this.setState({ data: DataFacade.data });
  }

  SetUser = (userInfo) => {
    this.setState({ user: userInfo });
  }

  render() {
    return (
      <Router>
        <div>
          <Header user={this.state.user}/>
          <Switch>
            <Route
              exact path="/"
              component={Home}
            />
            <Route
              exact path="/tableRender"
              render={(matchUtil) => <TableRender testData={testData} match={matchUtil.match} history={matchUtil.history} data={this.state.data} />}
            />
            <Route
              path="/tableRender/:objectId"
              render={(matchUtil) => <SingleObject testData={testData} match={matchUtil.match} history={matchUtil.history} />} //data={this.state.data}
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
              component={NoMatch}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const Header = ({user}) => {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      <li><NavLink activeClassName="active" to="/tableRender">renderTable</NavLink></li>
      <li><NavLink activeClassName="active" to="/authentication/loginForm">LoginForm</NavLink></li>
      <li>{user && <NavLink activeClassName="active" to="/user">User</NavLink>}</li>
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
