import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import CreateClub from "./pages/CreateClub"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="register" exact element={<Register />} />
        <Route path="login" exact element={<Login />} />
        <Route path="club" exact element={<CreateClub />} />
        {/* <Route path="dashboard" exact element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
