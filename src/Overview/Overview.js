import React, { Component } from 'react';
import { Col, Panel } from 'react-bootstrap';
import './Overview.css';
import { Link } from 'react-router-dom';

class Overview extends Component {
  constructor(props) {
    super(props)

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      totalMenuPrice: this.props.model.getTotalMenuPrice()
    }
  }

  render() {
    return (
      <Col sm={12} className="text-center">
        <p className="Overview">
          <Panel>
            <Panel.Body>
              <Col sm={2}>
              <Link to="/search">
                <button className="btn btn-primary">Go Back And Edit Dinner</button>
              </Link>
              </Col>
              <Col sm={10}></Col>
            </Panel.Body>
          </Panel>

          <div className="container-fluid">
            <div className="row">
              <Panel>
                <Panel.Body>
                  <Col xs={8}>
                    <span id="overviewDishes"></span>
                  </Col>
                </Panel.Body>
              </Panel>
              <Panel>
                <Panel.Body>
                  <Col xs={4} className="text-center">
                    <h3 className="dinnerConfirmText">Dinner confirmation</h3>
                    <p>Dinner for {this.state.numberOfGuests} people.</p>
                    <p>Total cost will be {this.state.totalMenuPrice} SEK.</p>
                    <Link to="/printout">
                      <button className="btn btn-primary">Print Full Recipe</button>
                    </Link>
                  </Col>
                </Panel.Body>
              </Panel>
            </div>
          </div>
        </p>
      </Col>
    );
  }
}

export default Overview;
