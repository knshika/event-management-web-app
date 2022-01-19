import React from "react"
import { Forms } from "../components/Forms"
import fetcher from "../utils/fetcher"
import { useNavigate } from "react-router-dom"

const createClubInputs = [
  { name: "name", type: "text", label: "Club name" },
  {
    name: "adminEmails",
    type: "text",
    label: "Admin emails (comma-separated)",
  },
]

const CreateClub = () => {
  const navigate = useNavigate()

  async function registerClub(formData) {
    const admin_emails = formData.adminEmails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email)

    const response = await fetcher("api/club/", {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        admin_emails, // fixed
      }),
    })

    const data = await response.json()
    if (response.status === 200) {
      alert("Successfully registered club")
      navigate(`/club/${data._id}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 ">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-1/2 max-w-md">
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Register a Club
        </div>

        <div className="mt-10">
          <Forms inputs={createClubInputs} onSubmit={registerClub} />
        </div>
      </div>
    </div>
  )
}

export default CreateClub
