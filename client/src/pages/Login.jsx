import React from "react"
import { useDispatch } from "react-redux"
import { Forms } from "../components/Forms"
import { API_URL } from "../const"
import { login } from "../state/slices/loginSlice"

const loginInputs = [
  { name: "email", type: "email", label: "Email Id" },
  { name: "password", type: "password", label: "Password" },
]

const Login = () => {
  const dispatch = useDispatch()

  async function loginUser(formData) {
    const response = await fetch(`${API_URL}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    console.log(response)

    if (response.status === 200) {
      const data = await response.json()
      console.log(data)
      const { user, token } = data
      localStorage.setItem("token", token)
      alert("Successfully logged in")
      dispatch(login({ user, token }))
    } else {
      alert("Something is wrong!! Check your email or password")
    }
  }
  return (
    <div className="flex flex-col justify-center items-center m-2">
      <h1 className="text-xl uppercase">Login </h1>
      <Forms inputs={loginInputs} onSubmit={loginUser} />
    </div>
  )
}

export default Login
