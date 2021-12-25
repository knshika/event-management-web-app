/* eslint-disable indent */
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateUser } from "../state/slices/loginSlice"
import { useLoginState } from "../state"
import { Forms } from "../components/Forms"
import fetcher from "../utils/fetcher"

const ProfileUpdate = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const loginState = useLoginState()
  const dispatch = useDispatch()
  const [userDetails, setUserDetails] = useState(null)

  const profileUpdateInputs = [
    {
      name: "name",
      type: "text",
      label: "Name",
      defaultValue: userDetails?.name,
    },
    {
      name: "email",
      type: "email",
      label: "Email Id",
      defaultValue: userDetails?.email,
    },
    {
      name: "dateOfBirth",
      type: "date",
      label: "Date Of Birth",
      defaultValue: userDetails?.dateOfBirth,
    },
    {
      name: "rollNo",
      type: "number",
      pattern: "[1-9][0-9][0-9][0-9][0-9][0-9][0-9]",
      label: "RollNo",
      defaultValue: userDetails?.rollNo,
    },
    {
      name: "branch",
      type: "text",
      label: "Branch",
      defaultValue: userDetails?.branch,
    },
    {
      name: "batch",
      type: "number",
      label: "Batch",
      defaultValue: userDetails?.batch,
    },
    {
      name: "mobileNo",
      type: "phone",
      label: "Mobile No",
      defaultValue: userDetails?.mobileNo,
    },
  ]

  async function updateUserProfile(formData) {
    dispatch(updateUser(formData))
    //console.log("updated?", loginState?.user) //recheck

    const response = await fetcher(`api/user/${id}`, {
      method: "POST",
      body: JSON.stringify(formData),
    })

    if (response.status === 200) {
      alert("Successfully updated your profile ")
      navigate(-1)
    }
  }

  const getUserDetails = async () => {
    const response = await fetcher(`api/user/${id}`, {
      method: "GET",
    })

    if (response.status === 200) {
      const data = await response.json()
      setUserDetails(data)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  return (
    userDetails && (
      <div className="flex flex-col justify-center items-center m-2">
        <h1 className="text-xl uppercase">Your Profile</h1>

        <Forms inputs={profileUpdateInputs} onSubmit={updateUserProfile} />
      </div>
    )
  )
}

export default ProfileUpdate
