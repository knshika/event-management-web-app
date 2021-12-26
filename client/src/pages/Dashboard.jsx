import React, { useEffect, useState } from "react"
import fetcher from "../utils/fetcher"
import { useNavigate, useParams } from "react-router-dom"
import { useLoginState } from "../state/slices/loginSlice"

const Dashboard = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useLoginState()
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
        {user?.superAdmin && (
          <button
            className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-gray-300"
            onClick={() => navigate("/club")}
          >
            Add Club
          </button>
        )}
        {userDetails?.adminOfClub?.length > 0 && (
          <div>
            <h3>Your clubs</h3>
            {userDetails.adminOfClub.map((club, index) => (
              <div className="flex " key={index}>
                <div>{club.name}</div>
                <button
                  className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
                  onClick={() => navigate(`/club/${club._id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
        {userDetails?.participatedEvents?.length > 0 && (
          <div>
            <h3>Your registered Events</h3>
            {userDetails.participatedEvents.map((event, index) => (
              <div className="flex " key={index}>
                <div>{event.name}</div>
                <button
                  className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
                  onClick={() => navigate(`/event/${event._id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  )
}

export default Dashboard
