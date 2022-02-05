import React from "react"

const Contact = () => {
  return (
    <main className="min-h-screen flex w-full items-center bg-gray-200  relative overflow-hidden ">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-11/12   relative z-20 items-center">
        <div className="flex max-w-6xl w-full px-6 mx-auto lg:px-8 ">
          <div className="flex-1 flex-col">
            <h1 className="font-medium w-full  text-center text-4xl sm:text-5xl text-gray-800">
              Get in touch
            </h1>
            <h2 className="font-medium max-w-2xl mx-auto w-full text-xl text-gray-700 text-center mb-2">
              Fill in the form to start a conversation
            </h2>

            <div className="space-y-4  text-gray-500 m-8 py-4 items-center">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>
                  Birsa Institute of Technology Sindri, Dhanbad , Jharkhand
                </span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>123456789</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 sm:mr-6"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>contact@business.com</span>
              </p>
            </div>
          </div>
          <form
            noValidate=""
            className="flex-1 flex-col py-6 justify-center w-full space-y-6 md:py-0 md:px-6"
          >
            <div className="flex flex-col mb-5 ">
              <label
                className="mb-2 text-xs tracking-wide text-gray-600"
                htmlFor="name"
              >
                Full name
              </label>
              <input
                className="text-sm placeholder-gray-500 pl-10 pr-4  rounded-xl border border-gray-400 w-full p-2 focus:outline-none focus:border-blue-400"
                id="name"
              />
            </div>
            <div className="flex flex-col mb-5 ">
              <label
                className="mb-2 text-xs tracking-wide text-gray-600"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="text-sm placeholder-gray-500 pl-10 pr-4  rounded-xl border border-gray-400 w-full p-2 focus:outline-none focus:border-blue-400"
                id="email"
              />
            </div>

            <div className="flex flex-col mb-5 ">
              <label
                className="mb-2 text-xs tracking-wide text-gray-600"
                htmlFor="msg"
              >
                Message
              </label>
              <textarea
                className="text-sm placeholder-gray-500 pl-10 pr-4  rounded-xl border border-gray-400 w-full p-2 focus:outline-none focus:border-blue-400"
                id="msg"
              />
            </div>

            <button
              type="button"
              className="uppercase py-2 px-4 bg-gray-800 border-2 border-transparent mb-8 rounded-lg text-white text-base mr-4 hover:bg-gray-900"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Contact
