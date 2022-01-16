import React from "react"

function PrizeItem({ prize, onChange, onRemove, showWinner }) {
  return (
    <div className="rounded-2xl border border-gray-400 p-2 mb-1">
      <div className="flex w-auto mb-5">
        <div className="flex flex-col">
          <label
            className="mb-1 text-xs tracking-wide text-gray-600"
            htmlFor="type"
          >
            Type
          </label>
          <input
            id="type"
            className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400  w-11/12   py-2 focus:outline-none focus:border-blue-400"
            type="text"
            value={prize.type}
            onChange={(e) => {
              onChange({ ...prize, type: e.target.value })
            }}
          />
        </div>
        <div className="flex flex-col">
          <label
            className="mb-1 text-xs tracking-wide text-gray-600"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400  w-11/12 py-2 focus:outline-none focus:border-blue-400"
            id="amount"
            type="number"
            value={prize.amount}
            onChange={(e) => {
              onChange({ ...prize, amount: e.target.valueAsNumber })
            }}
          />
        </div>
      </div>
      <div className="flex mb-5">
        <div className="flex flex-col">
          {showWinner && (
            <>
              <label
                className="mb-1 text-xs tracking-wide text-gray-600"
                htmlFor="winnerEmail"
              >
                Winner
              </label>
              <input
                className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400  w-11/12 py-2 focus:outline-none focus:border-blue-400"
                type="email"
                id="winnerEmail"
                value={prize.winnerEmail}
                onChange={(e) => {
                  onChange({ ...prize, winnerEmail: e.target.value })
                }}
              />
            </>
          )}
        </div>
        <button
          className="flex mt-1 items-center justify-center focus:outline-none text-white text-sm sm:text-base w-5/12 bg-gray-800 hover:bg-gray-900 rounded-2xl  transition duration-150 ease-in"
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default function PrizesInput({ prizes, onChange, showWinner }) {
  const addPrize = (event) => {
    event.preventDefault()
    onChange([...prizes, { type: "", amount: 0, winnerEmail: "" }])
  }

  const onPrizeUpdate = (idx, newPrize) => {
    const _prizes = [...prizes]
    _prizes[idx] = newPrize
    onChange(_prizes)
  }

  const onPrizeRemove = (idx) => {
    const _prizes = [...prizes]
    _prizes.splice(idx, 1)
    onChange(_prizes)
  }

  return (
    <div className="flex flex-col ">
      {prizes.map((prize, idx) => (
        <PrizeItem
          showWinner={showWinner}
          prize={prize}
          onChange={(newPrize) => onPrizeUpdate(idx, newPrize)}
          onRemove={() => onPrizeRemove(idx)}
          key={idx}
        />
      ))}

      <button
        className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-gray-800 hover:bg-gray-900 rounded-2xl py-2 w-full transition duration-150 ease-in"
        onClick={addPrize}
      >
        Add prize
      </button>
    </div>
  )
}
