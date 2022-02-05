import React from "react"

const ErrorPage = () => {
  return (
    <main className="min-h-screen flex w-full items-center bg-gray-200  relative overflow-hidden ">
      <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 m-auto rounded-3xl mt-5 w-11/12   relative z-20 items-center">
        <div className="container mx-auto h-screen pt-4 md:pt-0 px-6 z-10 flex items-center justify-between">
          <div className="container mx-auto px-6 flex flex-col justify-between items-center relative">
            <div className="flex flex-col">
              <h1 className="font-light w-full uppercase text-center text-4xl my-4 sm:text-5xl  text-gray-800">
                Sorry, this page isn&#x27;t available
              </h1>

              <div className="flex items-center justify-center mt-4">
                <a
                  href="#"
                  className="uppercase py-2 px-4 bg-gray-800 border-2 border-transparent mb-8 rounded-lg text-white text-base mr-4 hover:bg-gray-900"
                >
                  Go back home
                </a>
              </div>
            </div>
            <div className="block w-full mx-auto md:mt-0 relative max-w-md lg:max-w-2xl">
              <img
                src="/images/error.svg"
                className="max-w-xs md:max-w-2xl my-4 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ErrorPage
