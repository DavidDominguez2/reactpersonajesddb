/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import logo from "../assets/imgs/logo.png";
import axios from "axios";
import Global from "../Global";
import { NavLink } from "react-router-dom";

export default class Menu extends Component {
  state = {
    series: [],
    status: false,
  };

  loadSeries = () => {
    var request = "/api/series";
    var url = Global.url + request;

    axios.get(url).then((response) => {
      this.setState({
        status: true,
        series: response.data,
      });
    });
  };

  componentDidMount = () => {
    this.loadSeries();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg  bg-secondary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} style={{ width: "150px" }} />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/create">
                  Nuevo personaje
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/edit">
                  Modificar personajes
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Series
                </a>
                <ul className="dropdown-menu">
                  {this.state.series.map((serie, index) => {
                    return (
                      <li key={serie.idSerie}>
                        <NavLink
                          className="nav-link"
                          to={"/series/" + serie.idSerie}
                        >
                          {serie.nombre}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
