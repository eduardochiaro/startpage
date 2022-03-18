import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";

const Center = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    // Perform localStorage action
    const saved = localStorage.getItem("name")
    const initial = JSON.parse(saved);
    setName(initial);
  }, [])

  useEffect(() => {
    // storing input name
    localStorage.setItem("name", JSON.stringify(name));
  }, [name]);
  
  return (
    <div className="bg-green-100 flex flex-grow bg-cover bg-center" style={{ backgroundImage: `url("./images/bgs/bg-1.jpg")`}}>
      <div className="grid grid-cols-3 grid-flow-row gap-10 w-full p-10">

        <div className="rounded bg-white drop-shadow p-6">
          <div className="flex mb-4">
          <h2 className="text-2xl grow">Widget</h2>
          <div className="flex-none w-14 text-right">
            <Link
              href="#"

            >
            <a
              onClick={(e) => setName('test')}><PlusIcon className="h-6 inline-block text-grey-500 hover:text-grey-900"/></a>
            </Link>
          </div>
          </div>
          <p>{name}</p>
        </div>
        <div className="rounded bg-white drop-shadow p-6">02</div>
        <div className="rounded bg-white drop-shadow p-6">03</div>
        <div className="rounded bg-white drop-shadow p-6 col-span-2">06</div>
        <div className="rounded bg-white drop-shadow p-6">05</div>
      </div>
    </div>
  )
}
export default Center;