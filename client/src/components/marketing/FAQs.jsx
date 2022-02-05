import React from "react"

const FAQs = () => {
  return (
    <div className="container mx-auto px-6 p-6 bg-white my-8 rounded-md shadow-lg ">
      <div className="mb-16 text-center">
        <h2 className="text-base text-gray-600 font-semibold tracking-wide uppercase">
          How it works
        </h2>
        <p className="mt-2 text-4xl leading-8  tracking-tight text-gray-900  sm:text-4xl">
          Frequently Asked Questions
        </p>

        <div className="flex flex-col text-left divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-300 my-8">
          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline text-gray-700 text-xl">
              Optio maiores eligendi molestiae totam dolores similique?
            </summary>
            <div className="px-4 pb-4 text-gray-600 text-sm">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                neque in fugiat magni, quas animi enim veritatis deleniti ex.
                Impedit.
              </p>
            </div>
          </details>
          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline text-lg">
              Modi dolorem veritatis culpa quos consequuntur beatae itaque
              excepturi perspiciatis?
            </summary>
            <div className="px-4 pb-4 text-gray-600 text-sm">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                aspernatur quae, eos explicabo odit minima libero veniam
                similique quibusdam doloribus facilis ipsa accusantium vel
                maiores corrupti! Libero voluptate a doloribus?
              </p>
            </div>
          </details>
          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline text-lg">
              Magni reprehenderit possimus debitis?
            </summary>
            <div className="px-4 pb-4 space-y-2 text-gray-600 text-sm">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                voluptates aspernatur dolores in consequatur doloremque
                inventore reprehenderit, consequuntur perspiciatis architecto.
              </p>
              <p>
                Sed consectetur quod tenetur! Voluptatibus culpa incidunt
                veritatis velit quasi cupiditate unde eaque! Iure, voluptatibus
                autem eaque unde possimus quae.
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}

export default FAQs
