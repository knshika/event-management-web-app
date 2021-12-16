import React from "react"
import { Forms } from "../components/Forms"
import fetcher from "../utils/fetcher"
import { useNavigate, useParams } from "react-router-dom"

const updateClub = [{ name: "name", type: "text", label: "Club name" }]

const CreateClub = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  async function registerClub(formData) {
    const response = await fetcher(`api/club/${id}`, {
      method: "POST",
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (response.status === 200) {
      alert("Successfully updated club")
      navigate(`/club/${id}`)
    }

    console.log(data)
  }

  return (
    <div className="flex flex-col justify-center items-center m-2">
      <h1 className="text-xl uppercase">Update Club </h1>
      <Forms inputs={updateClub} onSubmit={registerClub} />
    </div>
  )
}

export default CreateClub
