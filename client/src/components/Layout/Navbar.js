import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
          <p className="navbar-brand">
            <a
              className="nav-link"
              href="/"
              style={{ color: "#ffffff", "text-decoration": "none" }}
            >
              Young&Rich
            </a>
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {isAuthenticated ? (
                <ul class="nav navbar-nav navbar-right">
                  <span class="navbar-text text-info font-weight-bold">
                    {user.name}
                  </span>
                  <li>
                    <a href="/history" className="nav-link">
                      {" "}
                      History
                    </a>
                  </li>
                  <a
                    href=""
                    onClick={this.onLogoutClick.bind(this)}
                    className="nav-link"
                  >
                    Logout
                  </a>
                </ul>
              ) : (
                <Link className="nav-link" to="/login">
                  Signin/Signup
                </Link>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
