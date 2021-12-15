import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "twind/shim"
import { setup } from "twind"
import { store } from "./state"
import { Provider } from "react-redux"

setup({
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Readex Pro'", "sans-serif"],
      },
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
