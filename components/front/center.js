import { useState, useEffect } from "react";
import { getFromStorage } from "../../utils/localStorage";
import Bookmarks from "../widgets/bookmarks";

const Center = () => {
  const [background, setBackground] = useState("/images/bgs/bg-1.jpg");

  useEffect(() => {
    function checkUserData() {
      const settings = getFromStorage("settings");
  
      if (settings) {
        setBackground(settings?.background || "/images/bgs/bg-1.jpg");
      }
    }
    checkUserData();
    window.addEventListener('itemInserted', checkUserData, false);
  
    return () => {
      window.removeEventListener('itemInserted', checkUserData)
    }
  }, [])

  return (
    <div className="bg-green-100 flex flex-grow bg-cover bg-center" style={{ backgroundImage: `url("${background}")`}}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-10 w-full p-10 z-8">
        <Bookmarks size="1" />
        <div className="rounded bg-white drop-shadow p-6">02</div>
        <div className="rounded bg-white drop-shadow p-6">03</div>
        <div className="rounded bg-white drop-shadow p-6 col-span-2">06</div>
        <div className="rounded bg-white drop-shadow p-6">05</div>
      </div>
    </div>
  )
}
export default Center;