import React, { useEffect, useState } from "react"
import fetcher from "../utils/fetcher"
import { useNavigate } from "react-router-dom"
import { useLoginState } from "../state/slices/loginSlice"

const Dashboard = () => {
  // var isActive = this.context.router.route.location.pathname === this.props.to
  //       var className = isActive ? 'active' : '';
  const navigate = useNavigate()
  const { user } = useLoginState()
  const [userDetails, setUserDetails] = useState(null)

  const getUserDetails = async () => {
    const response = await fetcher(`api/user/${user._id}`, {
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
    if (user?._id) getUserDetails()
  }, [user])

  return (
    userDetails && (
      <div className="min-h-screen flex w-full justify-center bg-gray-200">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-3/4 max-w-4xl">
          {userDetails?.participatedEvents?.length > 0 ? (
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
                  Your Events!!
                </div>
                <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                  Below are all your participated events
                </div>
              </div>

              <div className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                <div className=" relative ">
                  <input
                    type="text"
                    id='"form-subscribe-Search'
                    className=" rounded-lg flex-1 border-2 border-gray-800 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none "
                    placeholder="Enter a title"
                  />
                </div>
                <button
                  className="uppercase rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800 ">
              You have not registered in any events
            </div>
          )}
          <div className="flex flex-wrap  w-full p-2 py-8 rounded-xl ">
            {userDetails.participatedEvents &&
              userDetails.participatedEvents.map((event, index) => (
                <div
                  key={index}
                  className="overflow-hidden p-2 shadow-md bg-gray-100 rounded-lg h-72 py-2 w-56 cursor-pointer m-2"
                >
                  <img
                    alt="event photo"
                    src="/images/events.svg"
                    className="max-h-40 w-full object-cover "
                  />
                  <div className="  w-full p-4">
                    <p className="text-indigo-500 text-sm font-medium">
                      {console.log(event.club?.name)}
                      {/* problem why how clubs */}
                    </p>
                    <p className="text-gray-800  text-lg font-medium mb-2">
                      {event.name}
                    </p>
                    <p className="text-gray-400  text-sm">
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
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-1/4">
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            {userDetails.name}
          </div>
          <div className="  text-xl self-center sm:text-sm text-gray-500">
            {userDetails.email}
          </div>

          {user?.superAdmin && userDetails?.adminOfClub?.length == 0 ? (
            <>
              <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                Status : SuperAdmin
              </div>
              <div className="flex flex-col mt-2 ">
                <button
                  className="uppercase mt-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base  hover:bg-gray-900"
                  onClick={() => navigate("/club")}
                >
                  Add Club
                </button>
                <button
                  className="uppercase mt-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base  hover:bg-gray-900"
                  onClick={() => navigate("/clubs")}
                >
                  View Clubs
                </button>
              </div>
            </>
          ) : userDetails?.adminOfClub?.length == 0 ? (
            <>
              <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                Status : Student
              </div>
              <div className="flex flex-col mt-2">
                <button
                  className="uppercase mt-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base  hover:bg-gray-900"
                  onClick={() => navigate("/club")}
                >
                  Update profile
                </button>
                <button
                  className="uppercase mt-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base  hover:bg-gray-900"
                  onClick={() => navigate("/events")}
                >
                  More Events
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                Status : ClubAdmin
              </div>
              <div className="flex flex-col mt-2">
                <button
                  className="uppercase mt-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base  hover:bg-gray-900"
                  onClick={() => navigate("/club")}
                >
                  Update profile
                </button>
                <button
                  className="uppercase mt-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base  hover:bg-gray-900"
                  onClick={() => navigate("/events")}
                >
                  More Events
                </button>
              </div>
              <div className="flex flex-col mt-2  ">
                <div className="font-medium  text-xl text-gray-800 my-2">
                  Your Clubs
                </div>
                <div className="flex flex-wrap">
                  {userDetails.adminOfClub.map((club, index) => (
                    <div className="flex " key={index}>
                      <button
                        className="uppercase rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-2 hover:bg-gray-900 mt-2"
                        onClick={() => navigate(`/club/${club._id}`)}
                      >
                        {club.name}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    )
  )
}

export default Dashboard
