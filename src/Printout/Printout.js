import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import './Printout.css';
import { Link } from 'react-router-dom';

class Printout extends Component {
  render() {
    return (
      <Col sm={12} className="text-center">
        <p className="Printout">
            Printout Page
        </p>

        <Link to="/search">
            <button className="btn btn-primary">Go Back And Edit Dinner</button>
        </Link>
      </Col>
    );
  }
}

export default Printout;
