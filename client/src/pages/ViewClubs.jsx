import React, { useState, useEffect } from "react"
import fetcher from "../utils/fetcher"
import { useNavigate } from "react-router-dom"

const ViewClubs = () => {
  const navigate = useNavigate()
  const [clubsDetails, setClubsDetails] = useState(null)

  const getClubsDetail = async () => {
    const response = await fetcher("api/club/", {
      method: "GET",
    })

    if (response.status === 200) {
      const data = await response.json()
      setClubsDetails(data)
    }
  }
  const handleView = (clubId) => {
    navigate(`/club/${clubId}`)
  }

  useEffect(() => {
    getClubsDetail()
  }, [])
  return (
    clubsDetails && (
      <div>
        <h1>Below are the all clubs</h1>
        {clubsDetails.map((club, index) => (
          <div className="flex " key={index}>
            <div>{club.name}</div>
            <button
              className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
              onClick={() => handleView(club._id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    )
  )
}

export default ViewClubs
