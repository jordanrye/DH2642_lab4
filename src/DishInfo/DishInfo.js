import React, { Component } from 'react';
import { Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { modelInstance } from '../data/DinnerModel';
import './DishInfo.css';

class DishInfo extends Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      numberOfGuests: this.props.model.getNumberOfGuests(),
      dishId: this.props.dishId,
      loaded: false     // Used to disable the add dish to menu button until the dish is loaded
    }
  }

  // Update the state and re-render the application when data is retrieved.
  componentDidMount = () => {
    this.props.model.addObserver(this);
    this.update();
  }

  componentWillUnmount = () => this.props.model.removeObserver(this);

  update() {
    modelInstance.getDish(this.props.dishId).then(returnedDish => {
      this.setState({
        status: 'LOADED',
        dish: returnedDish,
        numberOfGuests: this.props.model.getNumberOfGuests(),
        priceOfDish: this.props.model.getPriceOfDish(returnedDish),
        tableHeight: (30 * returnedDish.extendedIngredients.length) + 90,
        loaded: true
      });
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      });
    })
  }

  addDishToMenu = () => this.props.model.addDishToMenu(this.state.dish);

  render() {
    let dishesList = null;

    // Depending on the state we either generate useful message to the user
    // or show the list of returned dishes.
    switch (this.state.status) {
      case 'INITIAL':
        dishesList = <div className="loader"></div>
        break;
      case 'LOADED':
        let style = {
          height: this.state.tableHeight
        };

        let ingredientsTable =
          this.state.dish.extendedIngredients.map((ingredient) =>
            <tr>
                <td>{ingredient.amount} {ingredient.unit}</td>
                <td>{ingredient.name}</td>
            </tr>
          )

        dishesList =
          <div className="row">
          <Col sm={6}>
            <Panel>
              <Panel.Body>
      					<div className="main-top">
                  <h3>{this.state.dish.title}</h3>
                  <img src={this.state.dish.image} alt=""/>
                  {this.state.dish.instructions}
      					</div>
              </Panel.Body>
            </Panel>
            </Col>
            <Col sm={6}>
            <Panel>
              <Panel.Body>
                <div className="notepad" style={style}>
                  <table className="notepad-ingredients">
                    <thead>
                      <tr>
                        <th colSpan="2">Shopping list...</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ingredientsTable}
                    </tbody>
                  </table>
                </div>
                Ingredients for {this.state.numberOfGuests} people.
                <br/>Total cost will be SEK {this.state.priceOfDish}.
              </Panel.Body>
            </Panel>
            </Col>
          </div>
        break;
      default:
        dishesList = <b>Failed to load data, please try again.</b>
        break;
    }

    return (
      <Col sm={9} smOffset={3} className="DishInfo">
        <Panel>
          <Panel.Body>
            <Link to="/search">
              <button className="btn btn-primary">Back To Search</button>
            </Link>
            <button className="btn btn-success pull-right" onClick={this.addDishToMenu} disabled={!this.state.loaded}>Add to menu (+)</button>
          </Panel.Body>
        </Panel>
        {dishesList}
      </Col>
    );
  }
}

export default DishInfo;
