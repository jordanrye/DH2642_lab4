import React, {Component} from 'react';
import {
    Col, Row,
    FormGroup, FormControl, Button,
    Panel
} from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom'
import { Link } from 'react-router-dom';
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
    var category = 'main course';
    var filter = '';

    if (typeof this.props.category !== 'undefined') category = this.props.category;
    if (typeof this.props.filter !== 'undefined') filter = this.props.filter;

    modelInstance.getAllDishes(category, filter).then(dishes => {
      this.setState({
        status: 'LOADED',
        dishes: dishes.results,
        baseUri: dishes.baseUri,
        category: '',
        keywords: ''
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
          <Col sm={3} className="SearchResultsWrapper">
            <Link to={"/dish/" + dish.id}>
              <Panel className="SearchResults">
                <Panel.Body>
                  <div className="crop">
                    <img src={this.state.baseUri + dish.image} alt=""/>
                  </div>
                </Panel.Body>
                <Panel.Footer>
                  {dish.title}
                </Panel.Footer>
              </Panel>
            </Link>
          </Col>
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
            <FormGroup className="FormGroup">
              <Col xs={12} sm={5} md={4} lg={3} className="FormField">
                <FormControl id="search-keywords" type="text" value={this.state.keywords} placeholder="Enter key words"/>
              </Col>
              <Col xs={12} sm={5} md={4} lg={3} className="FormField">
                <FormControl id="search-category" value={this.state.category} componentClass="select">
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

export default Dishes;
