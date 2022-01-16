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
      <div className="min-h-screen flex w-full justify-center bg-gray-100">
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
                  className="overflow-hidden p-2 shadow-lg bg-gray-50 rounded-lg h-72 py-2 w-56 cursor-pointer m-auto"
                >
                  <img
                    alt="event photo"
                    src="/images/events.svg"
                    className="max-h-40 w-full object-cover "
                  />
                  <div className=" dark:bg-gray-800 w-full p-4">
                    <p className="text-indigo-500 text-sm font-medium">
                      {console.log(event.club?.name)}
                      {/* problem why how clubs */}
                    </p>
                    <p className="text-gray-800 dark:text-white text-lg font-medium mb-2">
                      {event.name}
                    </p>
                    <p className="text-gray-400 dark:text-gray-300 text-sm">
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
          <div className=" self-center text-xl sm:text-sm text-gray-500">
            {userDetails.email}
          </div>
          {userDetails?.superAdmin && (
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              Status : SuperAdmin
            </div>
          )}
          {user?.superAdmin && userDetails?.adminOfClub?.length == 0 ? (
            <div className="flex flex-col mt-2">
              <button
                className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-gray-800 hover:bg-gray-900 text-white"
                onClick={() => navigate("/club")}
              >
                Add Club
              </button>
              <button
                className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-gray-800 hover:bg-gray-900 text-white"
                onClick={() => navigate("/clubs")}
              >
                View Clubs
              </button>
            </div>
          ) : (
            <div className="flex flex-col mt-2">
              <button
                className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-gray-800 hover:bg-gray-900 text-white"
                onClick={() => navigate("/club")}
              >
                Update profile
              </button>
              <button
                className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-gray-800 hover:bg-gray-900 text-white"
                onClick={() => navigate("/events")}
              >
                More Events
              </button>
            </div>
          )}

          {userDetails?.adminOfClub?.length > 0 && (
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              Status : ClubAdmin
            </div>
          )}
          {userDetails?.adminOfClub?.length != 0 && !user?.superAdmin && (
            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              Status : Student
            </div>
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
        </div>
      </div>
    )
  )
}

export default Dashboard

// <div class="w-full bg-white p-12">
//     <div class="header flex items-end justify-between mb-12">
//         <div class="title">
//             <p class="text-4xl font-bold text-gray-800 mb-4">
//                 Lastest articles
//             </p>
//             <p class="text-2xl font-light text-gray-400">
//                 All article are verified by 2 experts and valdiate by the CTO
//             </p>
//         </div>
//         <div class="text-end">
//             <form class="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
//                 <div class=" relative ">
//                     <input type="text" id="&quot;form-subscribe-Search" class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Enter a title"/>
//                     </div>
//                     <button class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
//                         Search
//                     </button>
//                 </form>
//             </div>
//         </div>
//         <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
//             <div class="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
//                 <a href="#" class="w-full block h-full">
//                     <img alt="blog photo" src="/images/blog/1.jpg" class="max-h-40 w-full object-cover"/>
//                     <div class="bg-white dark:bg-gray-800 w-full p-4">
//                         <p class="text-indigo-500 text-md font-medium">
//                             Video
//                         </p>
//                         <p class="text-gray-800 dark:text-white text-xl font-medium mb-2">
//                             Work at home
//                         </p>
//                         <p class="text-gray-400 dark:text-gray-300 font-light text-md">
//                             Work at home, remote, is the new age of the job, every person can work at home....
//                         </p>
//                         <div class="flex items-center mt-4">
//                             <a href="#" class="block relative">
//                                 <img alt="profil" src="/images/person/6.jpg" class="mx-auto object-cover rounded-full h-10 w-10 "/>
//                             </a>
//                             <div class="flex flex-col justify-between ml-4 text-sm">
//                                 <p class="text-gray-800 dark:text-white">
//                                     Jean Jacques
//                                 </p>
//                                 <p class="text-gray-400 dark:text-gray-300">
//                                     20 mars 2029 - 6 min read
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </a>
//             </div>

//         </div>
//     </div>
