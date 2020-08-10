// if(process.env.NODE_ENV!='local'){
//   __webpack_public_path__ = 'https://dev9cdn.stackby.com/';
// }

// if(process.env.NODE_ENV=='local'){
//   __webpack_public_path__ = 'http://192.168.0.107:8000/';
// }

// __webpack_public_path__ = process.env.CDN + "/build/"

// Statup point for client side appliacation
import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";

// if( NODE_ENV === 'local'){
//   axios.defaults.baseURL = process.env.API_HOST;
// }

// axios.defaults.headers.common['Content-Type'] = `application/json`;
// axios.defaults.withCredentials = true;

// Render react component on client side
ReactDOM.render(
 <h1>hi ...</h1>,
  document.getElementById("root")
);
