import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import './Overview.css';
import { Link } from 'react-router-dom';

class Overview extends Component {
  render() {
    return (
      <Col sm={12} className="text-center">
        <p className="Overview">
            Overview Page
        </p>

        <Link to="/printout">
            <button className="btn btn-primary">Print Full Recipe</button>
        </Link>

        <Link to="/search">
            <button className="btn btn-primary">Go Back And Edit Dinner</button>
        </Link>
      </Col>
    );
  }
}

export default Overview;
