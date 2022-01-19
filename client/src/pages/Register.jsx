/* eslint-disable indent */
import React from "react"
import { useNavigate } from "react-router-dom"
import { Forms } from "../components/Forms"
import fetcher from "../utils/fetcher"

const registrationInputs = [
  { name: "name", type: "text", label: "Name" },
  { name: "email", type: "email", label: "Email Id" },
  { name: "password", type: "password", label: "Password" },
  { name: "dateOfBirth", type: "date", label: "Date Of Birth" },
  {
    name: "rollNo",
    type: "number",
    pattern: "[1-9][0-9][0-9][0-9][0-9][0-9][0-9]",
    label: "RollNo",
  },
  { name: "branch", type: "text", label: "Branch" },
  { name: "batch", type: "number", label: "Batch" },
  { name: "mobileNo", type: "phone", label: "Mobile No" },
]

const Register = () => {
  const navigate = useNavigate()

  async function registerUser(formData) {
    const response = await fetcher("api/user/register", {
      method: "POST",
      body: JSON.stringify(formData),
    })

    if (response.status === 200) {
      alert("Successfully registered ")
      navigate("/login")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 ">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-1/2 max-w-md my-5">
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Join us Now
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Enter your credentials to get access account
        </div>
        <div className="mt-10">
          <Forms inputs={registrationInputs} onSubmit={registerUser} />
        </div>
      </div>
    </div>
  )
}

export default Register
