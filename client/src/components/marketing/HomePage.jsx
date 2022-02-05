import React from "react"

const HomePage = () => {
  return (
    <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-11/12   relative z-20 items-center">
      <div className="container mx-auto px-6 flex flex-col justify-between items-center relative py-8">
        <div className="flex flex-col">
          <h1 className="font-light w-full uppercase text-center text-4xl sm:text-5xl  text-gray-800">
            Welcome to Event Manager Of your college
          </h1>
          <h2 className="font-light max-w-2xl mx-auto w-full text-xl  text-gray-500 text-center py-8">
            Register your clubs to organize events in this event management web
            app and make it easy for students to participate.
          </h2>
          <div className="flex items-center justify-center mt-4">
            <a
              href="#"
              className="uppercase py-2 px-4 bg-gray-800 border-2 border-transparent rounded-lg text-white text-base mr-4 hover:bg-gray-900"
            >
              Get Started
            </a>
            <a
              href="#"
              className="uppercase py-2 px-4 bg-transparent border-2 border-gray-800 rounded-lg text-gray-800  hover:bg-gray-800 hover:text-white text-base"
            >
              Features
            </a>
          </div>
        </div>
        <div className="block w-full mx-auto mt-6 relative">
          <img
            src="/images/undraw_team_collaboration_re_ow29.svg"
            className="max-w-xs md:max-w-2xl my-4 mx-auto bg-gray-100 p-4 rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
