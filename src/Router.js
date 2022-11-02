import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";

import Menu from "./components/Menu";
import Home from "./components/Home";
import Serie from "./components/Serie";
import Personajes from "./components/Personajes";
import CreatePersonaje from "./components/CreatePersonaje";
import EditPersonaje from "./components/EditPersonaje";

export default class Router extends Component {
  render() {
    function SeriesElement() {
      var { idSerie } = useParams();
      return <Serie idSerie={idSerie} />;
    }

    function PersonajesElement() {
      var { idSerie } = useParams();
      return <Personajes idSerie={idSerie} />;
    }
    return (
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/series/:idSerie" element={<SeriesElement />} />
          <Route path="/personajes/:idSerie" element={<PersonajesElement />} />
          <Route path="/create" element={<CreatePersonaje />} />
          <Route path="/edit" element={<EditPersonaje />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
