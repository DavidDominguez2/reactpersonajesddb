import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import { NavLink } from "react-router-dom";

export default class Personajes extends Component {
  state = {
    status: false,
    personajes: [],
  };

  loadPersonajes = () => {
    var request = "/api/Series/PersonajesSerie/" + this.props.idSerie;
    var url = Global.url + request;

    axios.get(url).then((response) => {
      this.setState({ status: true, personajes: response.data });
    });
  };

  componentDidMount = () => {
    this.loadPersonajes();
  };

  render() {
    if (this.state.status) {
      return (
        <div>
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Personaje</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {this.state.personajes.map((personaje, index) => {
                return (
                  <tr key={personaje.idPersonaje}>
                    <td>{personaje.nombre}</td>
                    <td>
                      <img src={personaje.imagen} width="150px" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <NavLink
            to={"/series/" + this.props.idSerie}
            className="btn btn-danger"
          >
            VOLVER
          </NavLink>
        </div>
      );
    } else {
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
    }
  }
}
