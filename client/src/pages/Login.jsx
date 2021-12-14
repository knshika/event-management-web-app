import React from "react"
import { Forms } from "../components/Forms"
import { API_URL } from "../const"

const loginInputs = [
  { name: "email", type: "email", label: "Email Id" },
  { name: "password", type: "password", label: "Password" },
]

const Login = () => {
  async function loginUser(formData) {
    const response = await fetch(`${API_URL}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    console.log(response)

    const data = await response.json()

    if (response.status === 200) {
      localStorage.setItem("token", data.token)
      alert("Successfully logged in")
      //   window.location.href = "/dashboard"
    } else {
      alert("Something is wrong!! Check your email or password")
    }

    console.log(data.user)
  }
  return (
    <div className="flex flex-col align-center items-center m-2">
      <h1 className="text-xl uppercase">Login </h1>
      <Forms inputs={loginInputs} onSubmit={loginUser} />
    </div>
  )
}

export default Login
