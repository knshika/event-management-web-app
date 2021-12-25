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
    <div className="flex flex-col justify-center items-center m-2">
      <h1 className="text-xl uppercase">Club Register </h1>
      <Forms inputs={createClubInputs} onSubmit={registerClub} />
    </div>
  )
}

export default CreateClub
