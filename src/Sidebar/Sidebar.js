import React, { Component } from 'react';
import { Col, Navbar } from 'react-bootstrap';
import './Sidebar.css';
class Sidebar extends Component {

  constructor(props) {
    super(props)

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests()
    }
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests()
    })
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

  render() {
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
              @TODO: menu
            </div>
            <hr/>
            <center><button className="btn btn-primary">Confirm dinner</button></center>
          </Navbar.Collapse>
        </Navbar>
      </Col>
    );
  }
}

export default Sidebar;
