import React, { Component } from 'react';
import {
    Col, Row,
    FormGroup, FormControl, Button,
    Panel
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { modelInstance } from '../data/DinnerModel';
import './DishInfo.css';

class DishInfo extends Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL'
    }
  }

  // Update the state and re-render the application when data is retrieved.
  componentDidMount = () => {
    modelInstance.getAllDishes().then(dishes => {
      this.setState({
        status: 'LOADED',
        dishes: dishes.results,
        baseUri: dishes.baseUri
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  render() {
    let dishesList = null;

    // Depending on the state we either generate useful message to the user
    // or show the list of returned dishes.
    switch (this.state.status) {
      case 'INITIAL':
        dishesList = <div className="loader"></div>
        break;
      case 'LOADED':
        dishesList = <p>Success! {this.props.dishId}</p>
        break;
      default:
        dishesList = <b>Failed to load data, please try again.</b>
        break;
    }

    return (
      <Col sm={9} smOffset={3} className="DishInfo">
        {dishesList}
      </Col>
    );
  }
}

export default DishInfo;
