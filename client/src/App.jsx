import React, { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Register from "./pages/Register"
import Login from "./pages/Login"
import CreateClub from "./pages/CreateClub"
import HomePage from "./components/marketing/HomePage"
import Profile from "./pages/Profile"
import FAQs from "./components/marketing/FAQs"
import ErrorPage from "./pages/ErrorPage"
import Contact from "./components/marketing/Contact"
import Features from "./components/marketing/Features"
import ViewActiveEvents from "./pages/ViewActiveEvents"
import ViewClubs from "./pages/ViewClubs"
import ProfileUpdate from "./pages/ProfileUpdate"
import UpdateClub from "./pages/UpdateClub"
import ClubPage from "./pages/ClubPage"
import Dashboard from "./pages/Dashboard"
import EventPage from "./pages/EventPage"
import CreateEvent from "./pages/CreateEvent"
import Participants from "./pages/Participants"
import UpdateEvent from "./pages/UpdateEvent"
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
        <Route path="/" exact element={<HomePage />} />
        <Route path="register" exact element={<Register />} />
        <Route path="error" exact element={<ErrorPage />} />
        <Route path="contact" exact element={<Contact />} />
        <Route path="features" exact element={<Features />} />
        <Route path="faqs" exact element={<FAQs />} />
        <Route path="login" exact element={<Login />} />
        <Route path="events" exact element={<ViewActiveEvents />} />
        <Route path="clubs" exact element={<ViewClubs />} />
        <Route path="profile/:id/update" exact element={<ProfileUpdate />} />
        <Route path="profile/:id/" exact element={<Profile />} />
        <Route path="dashboard" exact element={<Dashboard />} />
        <Route path="club" exact element={<CreateClub />} />
        <Route path="club/:id/update" exact element={<UpdateClub />} />
        <Route path="club/:id" exact element={<ClubPage />} />
        <Route path="club/:id/event" exact element={<CreateEvent />} />
        <Route path="event/:eventId" exact element={<EventPage />} />
        <Route path="event/:eventId/update" exact element={<UpdateEvent />} />
        <Route
          path="event/:eventId/participants"
          exact
          element={<Participants />}
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
