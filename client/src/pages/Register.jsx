/* eslint-disable indent */
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../const"

const registrationInputs = [
  { name: "name", type: "text" },
  { name: "email", type: "email" },
  { name: "password", type: "password" },
  { name: "dateOfBirth", type: "date" },
  {
    name: "rollNo",
    type: "number",
    pattern: "[1-9][0-9][0-9][0-9][0-9][0-9][0-9]",
  },
  { name: "branch", type: "text" },
  { name: "batch", type: "number" },
  { name: "mobileNo", type: "phone" },
]

const Register = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({})

  const handleInputChange = (event) => {
    const { target } = event
    const key = target.name
    const value =
      target.type === "number"
        ? target.valueAsNumber
        : target.type === "date"
        ? target.valueAsDate
        : target.type === "phone"
        ? target.valueAsNumber
        : target.value
    setFormData((oldData) => ({ ...oldData, [key]: value }))
  }

  async function registerUser(event) {
    event.preventDefault()
    console.log(API_URL)

    const response = await fetch(`${API_URL}/api/user/register `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (response.status === 200) {
      alert("Successfully registered ")
      navigate("/login")
    }

    console.log(data)
  }

  return (
    <div className="flex flex-col align-center items-center m-2">
      <h1 className="text-xl uppercase">Register </h1>
      <form className="flex flex-col " onSubmit={registerUser}>
        {registrationInputs.map((item, index) => {
          const value =
            formData[item.name] && item.type === "date"
              ? new Date(formData[item.name]).toISOString().split("T")[0]
              : formData[item.name]

          return (
            <input
              className="m-1 p-1 border-2 rounded-sm"
              placeholder={item.name}
              {...item}
              required
              key={index}
              value={value}
              onChange={handleInputChange}
            />
          )
        })}

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

export default Register
