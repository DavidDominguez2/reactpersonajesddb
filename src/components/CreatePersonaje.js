import React, { Component } from "react";
import axios, { Axios } from "axios";
import Global from "../Global";
import { Navigate } from "react-router-dom";

export default class CreatePersonaje extends Component {
  state = {
    personaje: {},
    series: [],
    statusGet: false,
    statusPost: false,
  };

  inputNameRef = React.createRef();
  inputImagenRef = React.createRef();
  selectRef = React.createRef();

  loadSeries = () => {
    var request = "/api/series/";
    var url = Global.url + request;

    axios.get(url).then((response) => {
      this.setState({ series: response.data, statusGet: true });
    });
  };

  createPersonaje = (e) => {
    e.preventDefault();

    var nombre = this.inputNameRef.current.value;
    var imagen = this.inputImagenRef.current.value;
    var idSerie = parseInt(this.selectRef.current.value);

    var personaje = {
      idPersonaje: 0,
      nombre: nombre,
      imagen: imagen,
      idSerie: idSerie,
    };

    var request = "/api/Personajes";
    var url = Global.url + request;

    axios.post(url, personaje).then((response) => {
      this.setState({ statusPost: true });
    });
  };

  componentDidMount = () => {
    this.loadSeries();
  };

  render() {
    if (this.state.statusPost) {
      return <Navigate to={"/personajes/" + this.selectRef.current.value} />;
    } else {
      return (
        <div>
          <h1>Nuevo Personaje</h1>
          <form onSubmit={this.createPersonaje}>
            <label>Nombre: </label>
            <input type="text" ref={this.inputNameRef} /> <br />
            <label>Imagen: </label>
            <input type="text" ref={this.inputImagenRef} />
            <br />
            {this.state.statusGet && (
              <select ref={this.selectRef}>
                {this.state.series.map((serie, index) => {
                  return (
                    <option value={serie.idSerie} key={index}>
                      {serie.nombre}
                    </option>
                  );
                })}
              </select>
            )}
            <br />
            <button className="btn btn-primary">Insertar personaje</button>
          </form>
        </div>
      );
    }
  }
}
