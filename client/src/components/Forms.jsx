/* eslint-disable react/prop-types */
/* eslint-disable indent */
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Forms = ({ inputs, onSubmit, children }) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState(() => {
    const defaultValues = {}
    inputs.forEach((input) => {
      const val = input.defaultValue || input.value
      if (val) defaultValues[input.name] = val
    })
    return defaultValues
  })

  const handleInputChange = (event) => {
    const { target } = event
    const key = target.name
    const value =
      target.type === "number"
        ? target.valueAsNumber
        : target.type === "date"
        ? target.valueAsDate
        : target.type === "phone"
        ? target.valueAsNumber
        : target.value
    setFormData((oldData) => ({ ...oldData, [key]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="flex flex-col mt-5">
      {inputs.map((item, index) => {
        const value =
          formData[item.name] && item.type === "date"
            ? new Date(formData[item.name]).toISOString().split("T")[0]
            : formData[item.name]

        return (
          <div key={index} className="flex flex-col mb-5 ">
            {item.label && (
              <label
                className="mb-1 text-xs tracking-wide text-gray-600"
                htmlFor={item.name}
              >
                {item.label}
              </label>
            )}

            <input
              className="text-sm placeholder-gray-500 pl-10 pr-4  rounded-xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
              id={item.name}
              {...item}
              value={value}
              onChange={handleInputChange}
            />
          </div>
        )
      })}

      {children}

      <button
        type="submit"
        className="uppercase my-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base  hover:bg-gray-900"
        onClick={handleSubmit} //problem2 from=>div , cancel
      >
        Submit
      </button>
      <button
        type="submit"
        className="uppercase my-2 rounded-lg py-2 px-4 bg-gray-800 border-2 border-transparent text-white text-base  hover:bg-gray-900"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
    </div>
  )
}
