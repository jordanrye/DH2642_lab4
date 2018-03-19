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
        <div className="SearchForm">
          <h3>Find a dish</h3>
          <Row>
            <FormGroup className="FormGroup">
              <Col xs={12} sm={5} md={4} lg={3} className="FormField">
                <FormControl id="search-keywords" type="text" placeholder="Enter key words"/>
              </Col>
              <Col xs={12} sm={5} md={4} lg={3} className="FormField">
                <FormControl id="search-category" componentClass="select">
                  <option>Main course</option>
                  <option>Side dish</option>
                  <option>Dessert</option>
                  <option>Appetizer</option>
                  <option>Salad</option>
                  <option>Bread</option>
                  <option>Breakfast</option>
                  <option>Soup</option>
                  <option>Beverage</option>
                  <option>Sauce</option>
                  <option>Drink</option>
                </FormControl>
              </Col>
              <Col xs={12} sm={2} md={4} lg={2} className="FormField">
                <Button id="search-update" type="submit" className="btn btn-primary">Search</Button>
              </Col>
            </FormGroup>
          </Row>
        </div>
        <ul>
          {dishesList}
        </ul>
      </Col>
    );
  }
}

export default DishInfo;
