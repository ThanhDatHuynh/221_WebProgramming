import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import {withRouter} from "../common/withRouter"

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false,
    };
  }
  handleClick = () => this.setState({ click: !this.state.click });
  closeMobileMenu = () => {
    this.setState({ click: false });
  };

  render = () => {
    return (
      <nav className="my-navbar">
        <Link to="/" className="navbar-logo" onClick={this.closeMobileMenu}>
          <img className="logo" src={require("../images/logo.png")} />
          <div className="branch-text">DHT Company</div>
        </Link>
        <div className="menu-icon" onClick={this.handleClick}>
          <i className={this.state.click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={this.state.click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={this.closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/products"
              className="nav-links"
              onClick={this.closeMobileMenu}
            >
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className="nav-links"
              onClick={this.closeMobileMenu}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact-us"
              className="nav-links"
              onClick={this.closeMobileMenu}
            >
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/login"
              className="nav-links-mobile"
              onClick={this.closeMobileMenu}
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/register"
              className="nav-links-mobile"
              onClick={this.closeMobileMenu}
            >
              Register
            </Link>
          </li>
        </ul>
        <div className="login-register">
          <button
            className="navbar-button"
            onClick={() => {
              this.props.navigate("/register");
            }}
          >
            Register
          </button>
          <button
            className="navbar-button"
            onClick={() => {
              this.props.navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </nav>
    );
  };
}
export default withRouter(NavBar);
