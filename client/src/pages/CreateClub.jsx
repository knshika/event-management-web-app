import React from "react"
import { Forms } from "../components/Forms"
import { API_URL } from "../const"

const createClubInputs = [
  { name: "name", type: "text", label: "Club name" },
  {
    name: "adminEmails",
    type: "text",
    label: "Admin emails (comma-separated)",
  },
]

const CreateClub = () => {
  async function registerClub(formData) {
    const adminEmails = fromData.adminEmails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email)

    const response = await fetch(`${API_URL}/api/club/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clubName: formData.name,
        adminEmails,
      }),
    })
    console.log(response)

    const data = await response.json()

    if (response.status === 200) {
      alert("Successfully registered club")
      // navigate("/login")
    }

    console.log(data)
  }

  return (
    <div className="flex flex-col justify-center items-center m-2">
      <h1 className="text-xl uppercase">Club Register </h1>
      <Forms inputs={createClubInputs} onSubmit={registerClub} />
    </div>
  )
}

export default CreateClub
