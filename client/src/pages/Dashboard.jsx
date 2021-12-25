import React, { useEffect, useState } from "react"
import fetcher from "../utils/fetcher"
import { useNavigate, useParams } from "react-router-dom"

const Dashboard = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState(null)

  const getUserDetails = async () => {
    const response = await fetcher(`api/user/${id}`, {
      method: "GET",
    })
    const data = await response.json()
    if (data) {
      setUserDetails(data)
    } else {
      response.err({ error: data.error })
    }
  }
  useEffect(() => {
    getUserDetails()
  }, [])

  return (
    userDetails && (
      <div className="flex flex-col justify-center items-center bg-blue-100 m-2">
        <h1 className="text-xl  text-2xl m-2 p-2 ">
          Welcome {userDetails.name} !!
        </h1>
        <button
          className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-gray-300"
          onClick={() => navigate(`/dashboard/${userDetails._id}/profile`)}
        >
          Update Profile
        </button>
      </div>
    )
  )
}

export default Dashboard
