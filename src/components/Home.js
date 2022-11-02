import React, { Component } from "react";
import series from "../assets/imgs/series-tv.jpg";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>HOME</h1>
        <img src={series} width="400px" />
      </div>
    );
  }
}
