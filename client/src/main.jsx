import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "twind/shim"
import { setup } from "twind"

setup()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
