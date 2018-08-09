import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    const currentUsers = this.props.userCount;
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="user-count">Current Users: {currentUsers}</span>
      </nav>
    )
  }
}

export default NavBar;