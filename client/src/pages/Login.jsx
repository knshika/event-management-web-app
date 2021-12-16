import React from "react"
import { useDispatch } from "react-redux"
import { Forms } from "../components/Forms"
import fetcher from "../utils/fetcher"
import { login } from "../state/slices/loginSlice"
import { useNavigate, useParams } from "react-router-dom"

const loginInputs = [
  { name: "email", type: "email", label: "Email Id" },
  { name: "password", type: "password", label: "Password" },
]

const Login = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function loginUser(formData) {
    const response = await fetcher("api/user/login", {
      method: "POST",
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
      navigate("/user/${id}")
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
