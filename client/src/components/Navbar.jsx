import React from "react"
import { useDispatch } from "react-redux"
import { logout } from "../state/slices/loginSlice"
import { useLoginState } from "../state"
import { Link, useNavigate } from "react-router-dom"

const NavLink = ({ link, children }) => {
  return (
    <Link to={link} className="px-2 py-1">
      {children}
    </Link>
  )
}

const Navbar = () => {
  const navigate = useNavigate()
  const loginState = useLoginState()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <div className="py-2 px-5 flex items-center bg-gray-500 ">
      <button
        className="text-white font-bold text-lg "
        onClick={() => navigate("/")}
      >
        EventManager
      </button>
      <div className="text-white font-bold text-sm mr-auto">
        {loginState.user && (
          <>
            <NavLink link="/clubs">clubs</NavLink>
            <NavLink link="/events">events</NavLink>
          </>
        )}
      </div>
      <div className="text-white font-bold text-sm ml-auto">
        {loginState.user ? (
          <>
            <NavLink link={`/dashboard/${loginState.user._id}`}>
              {loginState.user.name}
            </NavLink>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink link="/login"> Login </NavLink>
            <NavLink link="/register"> Register </NavLink>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
