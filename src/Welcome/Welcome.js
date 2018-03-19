import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import './Welcome.css';
import { Link } from 'react-router-dom';

class Welcome extends Component {
  render() {
    return (
      <Col sm={12} className="text-center">
        <p className="Welcome">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        <Link to="/search">
          <button className="btn btn-primary">Start planning</button>
        </Link>
      </Col>
    );
  }
}

export default Welcome;
