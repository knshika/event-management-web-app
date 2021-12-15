import React from "react"
import { useLoginState } from "../state"
import { Link } from "react-router-dom"

const NavLink = ({ link, children }) => {
  return (
    <Link to={link} className="px-2 py-1">
      {children}
    </Link>
  )
}

const Navbar = () => {
  const loginState = useLoginState()

  return (
    <div className="py-2 px-5 flex items-center bg-gray-500 ">
      <h1 className="text-white font-bold text-lg ">EventManager</h1>

      <div className="text-white font-bold text-sm ml-auto">
        {loginState.user ? (
          <NavLink link="/profile">{loginState.user.name}</NavLink>
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
