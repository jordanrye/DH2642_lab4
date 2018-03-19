import React, { Component } from 'react';
import { Col, Panel } from 'react-bootstrap';
import './Overview.css';
import { Link } from 'react-router-dom';

class Overview extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      totalMenuPrice: this.props.model.getTotalMenuPrice(),
      selectedDishes: this.props.model.getSelectedDishes()
    };
  }

  render() {
    let dishInfos =
      this.state.selectedDishes.map((selectedDish) =>
        <Panel>
          <Panel.Body>
            <div className="crop">
              <img src={selectedDish.image} alt=""/>
            </div>
          </Panel.Body>
          <Panel.Footer>
            {selectedDish.title}
            <div className="pull-right">
              {this.props.model.getPriceOfDish(selectedDish)} SEK
            </div>
          </Panel.Footer>
        </Panel>
      )

    return (
      <Col sm={12} className="text-center">
        <p className="Overview">
          <Panel>
            <Panel.Body>
              <Link to="/search">
                <button className="btn btn-primary">Go Back And Edit Dinner</button>
              </Link>
            </Panel.Body>
          </Panel>

          <div className="container-fluid">
            <Col xs={8}>
              {dishInfos}
            </Col>
            <Col xs={4} className="text-center dinnerConfirmation">
              <Panel>
                <Panel.Body>
                    <h3 className="dinnerConfirmText">Dinner confirmation</h3>
                    <p>Dinner for {this.state.numberOfGuests} people.</p>
                    <p>Total cost will be {this.state.totalMenuPrice} SEK.</p>
                    <Link to="/printout">
                      <button className="btn btn-primary">Print Full Recipe</button>
                    </Link>
                </Panel.Body>
              </Panel>
            </Col>
          </div>
        </p>
      </Col>
    );
  }
}

export default Overview;
