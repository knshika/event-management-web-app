import React from "react"
import { useDispatch } from "react-redux"
import { Forms } from "../components/Forms"
import fetcher from "../utils/fetcher"
import { login } from "../state/slices/loginSlice"
import { useNavigate } from "react-router-dom"

const loginInputs = [
  { name: "email", type: "email", label: "Email Id" },
  { name: "password", type: "password", label: "Password" },
]

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function loginUser(formData) {
    const response = await fetcher("api/user/login", {
      method: "POST",
      body: JSON.stringify(formData),
    })

    if (response.status === 200) {
      const data = await response.json()

      const { user, token } = data
      localStorage.setItem("token", token)
      alert("Successfully logged in")
      dispatch(login({ user, token }))
      navigate("/dashboard")
    } else {
      alert("Something is wrong!! Check your email or password")
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-200">
      <div className="flex flex-col bg-white mt-4 shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-1/2 max-w-md">
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Login Now
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Log in to access your account
        </div>
        <div className="mt-10">
          <Forms inputs={loginInputs} onSubmit={loginUser} />
        </div>
      </div>
    </div>
  )
}

export default Login
