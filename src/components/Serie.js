import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import { NavLink } from "react-router-dom";

export default class Serie extends Component {
  state = {
    serie: {},
    status: false,
  };

  loadSerie = () => {
    var request = "/api/series/" + this.props.idSerie;
    var url = Global.url + request;

    axios.get(url).then((response) => {
      this.setState({ serie: response.data, status: true });
    });
  };

  componentDidMount = () => {
    this.loadSerie();
  };

  componentDidUpdate = (oldProps) => {
    if (oldProps.idSerie != this.props.idSerie) {
      this.loadSerie();
    }
  };

  render() {
    if (this.state.status == false) {
      return (
        <div>
          <div className="d-flex justify-content-center my-5">
            <div
              className="spinner-border text-danger"
              style={{ width: "5rem", height: "5rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="card" style={{ width: "31rem" }}>
            <img
              src={this.state.serie.imagen}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{this.state.serie.nombre}</h5>
              <p className="card-text">IMDB: {this.state.serie.puntuacion}</p>
              <NavLink
                to={"/personajes/" + this.props.idSerie}
                className="btn btn-success"
              >
                Personajes
              </NavLink>
            </div>
          </div>
        </div>
      );
    }
  }
}
