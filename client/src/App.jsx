import React, { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import CreateClub from "./pages/CreateClub"
import Navbar from "./components/Navbar"
import UpdateClub from "./pages/UpdateClub"
import ClubPage from "./pages/ClubPage"
import Dashboard from "./pages/Dashboard"
import { useDispatch } from "react-redux"
import fetcher from "./utils/fetcher"
import { login, logout } from "./state"

const App = () => {
  const dispatch = useDispatch()

  //In order to check if we have token in local storage and return the user
  const verifyToken = async (token) => {
    const res = await fetcher("api/user/verifyToken", {
      headers: {
        Authorization: token,
      },
    })
    const { user } = await res.json()
    dispatch(login({ user, token }))
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) verifyToken(token)
    else dispatch(logout()) //when page loads show the user else log him out
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="register" exact element={<Register />} />
        <Route path="login" exact element={<Login />} />
        <Route path="club" exact element={<CreateClub />} />
        <Route path="club/:id/update" exact element={<UpdateClub />} />
        <Route path="club/:id" exact element={<ClubPage />} />
        <Route path="user/:id" exact element={<Dashboard />} />

        {/* <Route path="dashboard" exact element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
