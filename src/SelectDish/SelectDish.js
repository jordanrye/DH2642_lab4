import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';

class SelectDish extends Component {
  render() {
    return (
      <div className="SelectDish">
        <h2>This is the Select Dish screen</h2>
        
        {/* We pass the model as property to the Sidebar component */}
        <Sidebar model={this.props.model}/>
        <Dishes/>
      </div>
    );
  }
}

export default SelectDish;
