import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import { getFromStorage, setToStorage } from '../../utils/localStorage'
import { useEffect, useState } from 'react'

const bgImages = [
  '/images/bgs/bg-1.jpg',
  '/images/bgs/bg-2.jpg',
  '/images/bgs/bg-3.png'
]

const header = () => {
  const [background, setBackground] = useState("/images/bgs/bg-1.jpg");

  useEffect(() => {
    // Perform localStorage action
    const settings = getFromStorage("settings");
    setBackground(settings?.background || "/images/bgs/bg-1.jpg");
  }, []);

  const changeBackground = (image) => {
    const settings = getFromStorage('settings');
    setToStorage("settings", { ...settings, background: image});
    setBackground(image);
  }

  return (
    <div className="relative bg-sky-100 text-white drop-shadow-xl z-10">
      <div className="w-full mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Startpage</span>
              <div
                className="h-8 w-auto sm:h-10">
                <Image
                  src="/images/squircle.svg"
                  alt="Startpage"
                  layout="intrinsic"
                  width="40"
                  height="40"
                />
              </div>
            </a>
          </div>
          <nav className="hidden md:flex space-x-10">
            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Pricing
            </a>

            <Popover className="relative">
              <>
                <Popover.Button className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Options 
                  <ChevronDownIcon
                    className="w-5 h-5 ml-2 -mr-1 inline-block"
                    aria-hidden="true"
                  />
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform right-0 sm:px-0 lg:max-w-xl text-gray-900">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white  p-7">
                      <h4 className="mb-3 font-bold">Settings</h4>
                      <hr/>
                      <h5 className="my-3">Select Background</h5>
                      <div className="relative grid gap-8 lg:grid-cols-6">
                        {bgImages.map(image => (
                          <div 
                            key={image}
                            onClick={ () => changeBackground(image)}
                            className={`rounded-lg h-10 bg-cover bg-center border-2 cursor-pointer ${background == image ? 'border-sky-500' : 'border-gray-300'}`} style={{ backgroundImage: `url("${image}")`}}>
                          </div>
                        )) }
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            </Popover>
          </nav>
        </div>
      </div>
    </div>

  )
}
export default header;