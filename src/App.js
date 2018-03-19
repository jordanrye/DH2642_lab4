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
          <Route exact path="/overview" render={() => <Overview model={modelInstance}/>}/>
          <Route exact path="/printout" render={() => <Printout model={modelInstance}/>}/>
        </Row>
      </Grid>
    );
  }
}

export default App;
