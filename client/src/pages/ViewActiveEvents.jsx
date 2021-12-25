import React, { useState, useEffect } from "react"
import fetcher from "../utils/fetcher"
import { useNavigate } from "react-router-dom"

const ViewActiveEvents = () => {
  const navigate = useNavigate()
  const [eventsDetails, setEventsDetails] = useState(null)

  const getEventsDetail = async () => {
    const response = await fetcher("api/event/", {
      method: "GET",
    })

    if (response.status === 200) {
      const data = await response.json()
      setEventsDetails(data)
    }
  }
  const handleView = (eventId) => {
    navigate(`/event/${eventId}`)
  }

  useEffect(() => {
    getEventsDetail()
  }, [])
  return (
    eventsDetails && (
      <div>
        <h1>Below are all active events</h1>
        {eventsDetails.map((event, index) => (
          <div className="flex " key={index}>
            <div>{event.name}</div>
            <button
              className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
              onClick={() => handleView(event._id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    )
  )
}

export default ViewActiveEvents
