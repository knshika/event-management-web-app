import React, { useState, useEffect } from "react"
import { Forms } from "../components/Forms"
import fetcher from "../utils/fetcher"
import { useNavigate, useParams } from "react-router-dom"

const updateClubAdminsInput = [
  {
    name: "adminEmails",
    type: "text",
    label: "Admin emails (comma-separated)",
  },
]

const UpdateClub = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [clubDetails, setClubDetails] = useState(null)

  const updateClubDetails = [
    {
      name: "name",
      type: "text",
      label: "Club name",
      defaultValue: clubDetails?.name,
    },
  ]

  const getClubDetails = async () => {
    const response = await fetcher(`api/club/${id}`, {
      method: "GET",
    })

    if (response.status === 200) {
      const data = await response.json()
      setClubDetails(data)
    }
  }

  const handleAdminRemove = async (adminId) => {
    const response = await fetcher(`api/club/${id}/admin/${adminId}`, {
      method: "DELETE",
    })

    if (response.status === 200) {
      alert("Successfully removed")
      const data = await response.json()
      setClubDetails(data)
      getClubDetails()
    }
    navigate(`/club/${id}/update`)
  }

  async function updateClub(formData) {
    const response = await fetcher(`api/club/${id}`, {
      method: "POST",
      body: JSON.stringify(formData),
    })

    if (response.status === 200) {
      alert("Successfully updated club")
      navigate(`/club/${id}`)
    }
  }

  async function updateClubAdmins(formData) {
    const admin_emails = formData.adminEmails
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email)

    const response = await fetcher(`api/club/${id}/admin`, {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        admin_emails, // fixed
      }),
    })

    const data = await response.json()

    if (response.status === 200) {
      alert("Successfully updated club Admins")
      setClubDetails(data)
      getClubDetails()
      navigate(`/club/${id}/update`)
    }
  }

  useEffect(() => {
    getClubDetails()
  }, [])

  return (
    clubDetails && (
      <div className=" flex flex-col justify-center  bg-gray-200 p-2">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-1/2 max-w-md  m-auto mt-4">
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Update {clubDetails.name}
          </div>

          <Forms inputs={updateClubDetails} onSubmit={updateClub} />
        </div>
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-4 rounded-3xl w-1/2 max-w-md m-auto mt-4 ">
          <div className="flex flex-col m-2 w-full ">
            <h2 className=" font-medium  text-2xl sm:text-2xl text-gray-700 m-2">
              Update Admins
            </h2>
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
                    <button
                      className="uppercase my-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base mr-4 hover:bg-gray-900"
                      onClick={() => handleAdminRemove(item._id)}
                    >
                      remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Forms inputs={updateClubAdminsInput} onSubmit={updateClubAdmins} />
        </div>
      </div>
    )
  )
}

export default UpdateClub
