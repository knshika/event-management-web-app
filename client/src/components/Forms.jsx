/* eslint-disable react/prop-types */
/* eslint-disable indent */
import React, { useState } from "react"

export const Forms = ({ inputs, onSubmit }) => {
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
    <form className="flex flex-col " onSubmit={handleSubmit}>
      {inputs.map((item, index) => {
        const value =
          formData[item.name] && item.type === "date"
            ? new Date(formData[item.name]).toISOString().split("T")[0]
            : formData[item.name]

        return (
          <div key={index} className="flex flex-col mb-2">
            {item.label && <label htmlFor={item.name}>{item.label}</label>}

            <input
              className="m-1 p-1 border-2 rounded-sm"
              id={item.name}
              {...item}
              value={value}
              onChange={handleInputChange}
            />
          </div>
        )
      })}

      <button
        type="submit"
        className=" m-2 py-2 px-1 border-2 rounded-lg uppercase bg-gray-300"
      >
        Submit
      </button>
    </form>
  )
}
