import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, NavLink, Switch, Link, Route } from 'react-router-dom';
import TableRender from './ObjectRendering/TableRender';
import SingleObject from './ObjectRendering/SingleObject';
import testData from './Facade/TestData';
import DataFacade from './Facade/DataFacade';


class App extends Component {

  //use dataFacade here
  constructor(props) {
    super(props);
    this.state = { data: [] }
  }

  async componentDidMount() {
    await DataFacade.getData();
    this.setState({ data: DataFacade.data });
  }

  render() {
    return (
      <Router>
        <div>
          <Header />

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
              render={(matchUtil) => <SingleObject testData={testData} match={matchUtil.match} history={matchUtil.history} />}
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

const Header = () => {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      <li><NavLink activeClassName="active" to="/tableRender">renderTable</NavLink></li>
    </ul>
  );
}

const Home = () => {
  return "hi hi hi";
}


const NoMatch = () => {
  return (
    "hi from no match"
  );
}

export default App;
