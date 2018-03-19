import React, { Component } from 'react';
import { Col, Panel } from 'react-bootstrap';
import './Printout.css';
import { Link } from 'react-router-dom';

class Printout extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests()
    };
  }

  render() {
    return (
      <Col sm={12} className="text-center">
        <p className="Printout">
          <Panel>
            <Panel.Body>
              <Col sm={2}>
              <Link to="/search">
                <button className="btn btn-primary">Go Back And Edit Dinner</button>
              </Link>
              </Col>
              <Col sm={10}>
                <h3 className="pull-right">Dinner for {this.state.numberOfGuests} people</h3>
              </Col>
            </Panel.Body>
          </Panel>
        </p>
      </Col>
    );
  }
}

export default Printout;
