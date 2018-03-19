import React, { Component } from 'react';
import { Col, Navbar, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component {

  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      selectedDishes: this.props.model.getSelectedDishes(),
      totalMenuPrice: this.props.model.getTotalMenuPrice()
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount = () => this.props.model.addObserver(this);

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount = () => this.props.model.removeObserver(this);

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      selectedDishes: this.props.model.getSelectedDishes(),
      totalMenuPrice: this.props.model.getTotalMenuPrice()
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => this.props.model.setNumberOfGuests(+e.target.value);

  render() {
    let selectedDishesTable =
      this.state.selectedDishes.map((selectedDish) =>
        <tr>
          <td>{selectedDish.title}</td>
          <td>{this.props.model.getPriceOfDish(selectedDish)}</td>
        </tr>
      )

    return (
      <Col xsHidden sm={3} className="Sidebar">
        <Navbar>
          <Navbar.Header>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <h3>My dinner</h3>
            <div>
              People: <input value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
              <br/>Total number of guests: {this.state.numberOfGuests}
            </div>
            <hr/>
            <div>
            <Table className="sidebarSelected">
              <tr className="hide-hr">
                <th>Dish Name</th>
                <th>Cost</th>
              </tr>
              {selectedDishesTable}
            </Table>
            <div className="sidebarTotalCost">
              {this.state.totalMenuPrice}
            </div>
            </div>
            <hr/>
            <center>
              <Link to="/overview">
                <button className="btn btn-primary">Confirm dinner</button>
              </Link>
            </center>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    );
  }
}

export default Sidebar;
