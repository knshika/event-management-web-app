import React, { useEffect, useState } from "react"
import fetcher from "../utils/fetcher"
import { useNavigate, useParams } from "react-router-dom"
import { useLoginState } from "../state/slices/loginSlice"

const ClubPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [clubDetails, setClubDetails] = useState(null)

  const clubAdmins = clubDetails?.admins
  const { user } = useLoginState()
  // console.log(
  //   "testing",
  //   clubAdmins,
  //   user?.adminOfClub?.includes(clubDetails?._id),
  //   user,
  //   user?._id,
  //   clubAdmins?.includes(user?._id)
  // ) //another way to show clubAdmins

  const isClubAdmin =
    user?.adminOfClub?.includes(clubDetails?._id) || user?.superAdmin

  const handleUpdate = () => {
    navigate(`/club/${id}/update`)
  }

  const handleCreateEvent = () => {
    navigate(`/club/${id}/event`)
  }

  const handleDelete = async () => {
    const response = await fetcher(`api/club/${id}`, {
      method: "DELETE",
    })

    if (response.status === 200) {
      alert("Successfully deleted")
    }
    navigate("/club")
  }

  const getClubDetails = async () => {
    const response = await fetcher(`api/club/${id}`, {
      method: "GET",
    })

    if (response.status === 200) {
      const data = await response.json()
      setClubDetails(data)
    }
  }
  useEffect(() => {
    getClubDetails()
  }, [])

  return (
    clubDetails &&
    user && (
      <div className="min-h-screen flex w-full justify-center bg-gray-200">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-2/3 max-w-4xl">
          <div className="px-4">
            <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
              {clubDetails.name}
            </div>
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-600">
              Our teams and events
            </div>
          </div>

          <div className="p-4 bg-white  mt-4 ">
            <p className="font-medium self-center text-xl sm:text-2xl text-gray-700 ">
              Our Events
            </p>
            <div className="flex flex-wrap py-8  ">
              {clubDetails.events.map((event, index) => (
                <div
                  key={index}
                  className="overflow-hidden shadow-lg rounded-lg bg-gray-50 w-52 "
                >
                  <img
                    alt="event photo"
                    src="/images/events.svg"
                    className="max-h-40 w-full object-cover "
                  />
                  <div className=" w-full p-4">
                    <p className="text-gray-800  text-lg font-medium mb-2">
                      {event.name}
                    </p>
                    <p className="capitalize text-gray-500  text-sm">
                      {event.description}
                    </p>
                    <div className="flex items-center mt-4">
                      <button
                        className="uppercase rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                        onClick={() => navigate(`/event/${event._id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:px-6 md:px-8 lg:px-10  m-auto  mt-5 w-1/3">
          <div className=" flex flex-col p-2  bg-white my-2 p-4 rounded-3xl shadow-md">
            <p className="font-medium  text-xl sm:text-2xl text-gray-800 px-4">
              Our Admins
            </p>
            <div className="flex flex-wrap min-w-[100px] mt-2">
              {clubDetails.admins.map((item, index) => (
                <div key={index} className="p-2 min-w-[52px]">
                  <div className="flex-col  flex justify-center items-center ">
                    <div className="flex-shrink-0">
                      <img
                        alt="profile"
                        src="/images/avatarMale.svg"
                        className="mx-auto object-cover rounded-full h-20 w-20 "
                      />
                    </div>
                    <div className="mt-2 text-center flex flex-col">
                      <span className="text-gray-600  text-base font-medium">
                        {item.name}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {item.email}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {isClubAdmin && (
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8  rounded-3xl mt-5 ">
              <div className="font-medium  text-2xl  text-gray-800 mb-4">
                Admin Section
              </div>
              <div className="flex flex-col mt-4 px-4">
                <button
                  className="uppercase my-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                  onClick={handleUpdate}
                >
                  Update Club
                </button>
                <button
                  className="uppercase my-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                  onClick={handleCreateEvent}
                >
                  Add Event
                </button>
                <button
                  className="uppercase my-2 rounded-lg py-2 px-4 bg-red-800 border-2 border-transparent text-white text-base mr-4 hover:bg-red-900"
                  onClick={handleDelete}
                >
                  Delete Club
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default ClubPage

{
  /* <div className="flex flex-col justify-center items-center bg-blue-100 m-2">
<h1 className="text-xl uppercase  text-2xl m-2 p-2 ">
  {clubDetails.name}
</h1>
<div className="flex flex-col m-2">
  <h2 className=" text-xl uppercase text-xl m-1">Admins</h2>
  {clubDetails.admins.map((item, index) => (
    <div className="p-1" key={index}>
      - {item.name}
    </div>
  ))}
</div>
<div className="flex flex-col m-2">
  <h2 className=" text-xl uppercase text-xl m-1">Events</h2>
  {clubDetails.events.map((item, index) => (
    <div
      className="p-1 cursor-pointer"
      key={index}
      onClick={() => navigate(`/event/${item._id}`)}
    >
      - {item.name}
    </div>
  ))}
</div>
{isClubAdmin ? (
  <div>
    <button
      className="m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
      onClick={handleUpdate}
    >
      Update Club
    </button>
    <button
      className="m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
      onClick={handleCreateEvent}
    >
      Add Event
    </button>
    <button
      className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-blue-200"
      onClick={handleDelete}
    >
      Delete Club
    </button>
  </div>
) : (
  <></>
)}
</div>
) : (
<div></div>
) */
}
