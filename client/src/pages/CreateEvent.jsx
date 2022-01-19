import React, { useEffect, useState } from "react"
import { Forms } from "../components/Forms"
import fetcher from "../utils/fetcher"
import PrizesInput from "../components/PrizesInput"
import { useNavigate, useParams } from "react-router-dom"

const createEventInputs = [
  { name: "name", type: "text", label: "Event name" },
  {
    name: "description",
    type: "text",
    label: "Description",
  },
  {
    name: "type",
    type: "text",
    label: "Event Type",
  },
  {
    name: "registrationFee",
    type: "number",
    label: "Registration Fee",
    defaultValue: 0,
  },
  // {
  //   name: "participationType",
  //   type: "number",
  //   label: "Participants Number",
  //   defaultValue: 1,
  // },
  {
    name: "registrationStart",
    type: "date",
    label: "Registration Start Date",
    defaultValue: new Date(),
  },
  {
    name: "start",
    type: "date",
    label: "Start Date",
  },
  {
    name: "end",
    type: "date",
    label: "End Date",
  },
  {
    name: "result",
    type: "date",
    label: "Result Date",
  },
]

const CreateEvent = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [prizes, setPrizes] = useState([])

  async function registerEvent(formData) {
    const transformedData = transformFomData({ ...formData, prizes })

    const response = await fetcher("api/event/", {
      method: "POST",
      body: JSON.stringify({ ...transformedData, club: id }),
    })

    if (response.status === 200) {
      const data = await response.json()
      alert("Successfully registered Event")
      navigate(`/event/${data._id}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 ">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-1/2 max-w-md my-5">
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Register a Event
        </div>

        <div className="mt-10">
          <Forms inputs={createEventInputs} onSubmit={registerEvent}>
            <PrizesInput
              prizes={prizes}
              onChange={setPrizes}
              showWinner={false}
            />
          </Forms>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent

/**
 * Transform create event form data into the format apis accepts
 * @param {{}} formData The form data object that you get on onSubmit of form
 * @returns An object you can pass to the api
 */
const transformFomData = ({
  name,
  description,
  start,
  end,
  registrationStart,
  result,
  type,
  registrationFee,
  // participationType,
  prizes,
  participants,
}) => {
  return {
    name,
    description,
    details: {
      type,
      registrationFee,
      // participationType,
    },
    dates: {
      start,
      end,
      registrationStart,
      result,
    },
    prizes: prizes || [],
    participants: participants || [],
  }
}
