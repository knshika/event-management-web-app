import React, { useState } from "react"
import { API_URL } from "../const"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function loginUser(event) {
    event.preventDefault()
    console.log(API_URL)

    const response = await fetch(`${API_URL}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
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
      <form className="flex flex-col " onSubmit={loginUser}>
        <input
          className="m-1 p-1 border-2 rounded-sm"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="m-1 p-1 border-2 rounded-sm"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-gray-300"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
