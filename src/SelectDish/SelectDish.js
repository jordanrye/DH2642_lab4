import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';

class SelectDish extends Component {
  render() {
    return (
      <Col sm={12} className="SelectDish">
        <Sidebar model={this.props.model}/>
        <Dishes/>
      </Col>
    );
  }
}

export default SelectDish;
