import React, {Component} from 'react';
import { Col, Row, FormGroup, FormControl, Button } from 'react-bootstrap';
import './Dishes.css';
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import {modelInstance} from '../data/DinnerModel';

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: 'INITIAL'
    }
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance.getAllDishes().then(dishes => {
      this.setState({
        status: 'LOADED',
        dishes: dishes.results
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
        dishesList = this.state.dishes.map((dish) =>
          <li key={dish.id}>{dish.title}</li>
        )
        break;
      default:
        dishesList = <b>Failed to load data, please try again.</b>
        break;
    }

    return (
      <Col sm={9} smOffset={3} className="Dishes">
        <div className="SearchForm">
          <h3>Find a dish</h3>
          <Row>
            <FormGroup>
              <Col xs={12} sm={5} md={4} lg={3}>
                <FormControl id="search-keywords" type="text" placeholder="Enter key words"/>
              </Col>
              <Col xs={12} sm={5} md={4} lg={3}>
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
              <Col xs={12} sm={2} md={4} lg={2}>
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

export default Dishes;
