/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";
import { Navigate } from "react-router-dom";

export default class EditPersonaje extends Component {
  state = {
    personajes: [],
    series: [],
    serie: {},
    statusGetSerie: false,
    statusPersonajes: false,
    statusSeries: false,
    statusEdit: false,
    statusGet: false,
    personaje: {},
  };

  selectSeriesRef = React.createRef();
  selectPersonajesRef = React.createRef();

  loadSeries = () => {
    var request = "/api/series";
    var url = Global.url + request;

    axios.get(url).then((response) => {
      this.setState({
        statusSeries: true,
        series: response.data,
      });
    });
  };

  loadPersonajes = () => {
    var request = "/api/personajes";
    var url = Global.url + request;

    axios.get(url).then((response) => {
      this.setState({
        statusPersonajes: true,
        personajes: response.data,
      });
    });
  };

  getSerie = () => {
    var idSerie = this.selectSeriesRef.current.value;
    var request = "/api/series/" + idSerie;
    var url = Global.url + request;

    axios.get(url).then((response) => {
      this.setState({ statusGetSerie: true, serie: response.data });
    });
  };

  getPersonaje = () => {
    var idPersonaje = this.selectPersonajesRef.current.value;

    var request = "/api/personajes/" + idPersonaje;
    var url = Global.url + request;

    axios.get(url).then((response) => {
      this.setState({ statusGet: true, personaje: response.data });
    });
  };

  editSerie = (e) => {
    e.preventDefault();
    var idpersonaje = this.selectPersonajesRef.current.value;
    var idserie = this.selectSeriesRef.current.value;

    var request = "/api/Personajes/" + idpersonaje + "/" + idserie;
    var url = Global.url + request;

    axios.put(url).then((response) => {
      this.setState({ statusEdit: true });
    });
  };

  componentDidMount = () => {
    this.loadSeries();
    this.loadPersonajes();
  };

  render() {
    if (this.state.statusEdit) {
      return (
        <Navigate to={"/personajes/" + this.selectSeriesRef.current.value} />
      );
    } else {
      return (
        <div>
          <h1>Personajes y series</h1>
          <form onSubmit={this.editSerie}>
            <p>Seleccione una serie: </p>
            <select ref={this.selectSeriesRef} onChange={this.getSerie}>
              {this.state.series.map((serie, index) => {
                return (
                  <option value={serie.idSerie} key={"serie" + serie.idSerie}>
                    {serie.nombre}
                  </option>
                );
              })}
            </select>
            <p>Seleccione un personaje: </p>
            <select ref={this.selectPersonajesRef} onChange={this.getPersonaje}>
              {this.state.personajes.map((personaje, index) => {
                return (
                  <option
                    value={personaje.idPersonaje}
                    key={"personaje" + personaje.idPersonaje}
                  >
                    {personaje.nombre}
                  </option>
                );
              })}
            </select>
            <br />
            <br />
            <button className="btn btn-primary">Guardar cambios</button>
          </form>
          {this.state.statusGetSerie && (
            <div>
              <h1>{this.state.serie.nombre}</h1>
              <img src={this.state.serie.imagen} width="300px" />
            </div>
          )}
          {this.state.statusGet && (
            <div>
              <h1>{this.state.personaje.nombre}</h1>
              <img src={this.state.personaje.imagen} width="300px" />
            </div>
          )}
        </div>
      );
    }
  }
}
