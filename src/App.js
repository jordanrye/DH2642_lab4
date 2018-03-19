import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel'
import SelectDish from "./SelectDish/SelectDish";
import Overview from "./Overview/Overview";
import Printout from "./Printout/Printout";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Dinner Planner',
    }
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <div className="App-header">{this.state.title}</div>
        </Row>
        <Row>
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome}/>
          <Route path="/search" render={() => <SelectDish model={modelInstance}/>}/>
          <Route exact path="/overview" component={Overview}/>
          <Route exact path="/printout" component={Printout}/>
        </Row>
      </Grid>
    );
  }
}

export default App;
