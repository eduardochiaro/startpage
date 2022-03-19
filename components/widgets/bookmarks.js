import { useState, useEffect } from "react";
import { GlobeIcon, PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { getFromStorage, setToStorage } from "../../utils/localStorage";
import axios from "axios";

const Bookmarks = ({ size = 1 }) => {

  const [inputNew, setInputNew] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // Perform localStorage action
    const initial = getFromStorage("bookmarks");
    setBookmarks(initial || []);
  }, []);

  const grabBookmark = () => {
    if ( inputNew.length > 0 ) {
      /*
      axios.get(url).then(res => {
        const { data } = res;
        //setBookmarks([...bookmarks, data]);
        console.log(data);
      });
      */
      bookmarks.push({ url: inputNew });
      setToStorage("bookmarks", bookmarks);
      setBookmarks(bookmarks);
      setInputNew("");
    }
  }

  return (
  <div className={`rounded bg-white drop-shadow p-6 col-span-${size}`}>
    <h2 className="text-2xl">Bookmarks</h2>
    <form className="w-full">
      <div className="flex items-center border-b border-sky-500 py-2">
        <input 
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
          type="url" 
          placeholder="Url" 
          aria-label="Url"
          onChange={ (event) => setInputNew(event.target.value) }
          value={ inputNew }
          required
          />
        <button 
          className="flex-shrink-0 bg-sky-500 hover:bg-sky-700 border-sky-500 hover:border-sky-700 text-sm border-4 text-white py-1 px-2 rounded" 
          type="button"
          onClick={ () => grabBookmark() }
          >
          <PlusIcon className="h-4 inline-block text-grey-500 hover:text-grey-900"/>
        </button>
      </div>
    </form>
    <div className="mt-4 relative grid gap-6 sm:gap-8">
      { bookmarks?.map((item, key) => 
        <Link
          key={ key } 
          href={item.url}>
          <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
            <GlobeIcon className="flex-shrink-0 h-6 w-6 text-sky-600" aria-hidden="true" />
            <div className="ml-4">
              <p className="text-base font-medium text-gray-900">{item.title}</p>
              <p className="mt-1 text-sm text-gray-500">{item.url}</p>
            </div>
          </a>
        </Link>
      ) }
    </div>
  </div>
  )
}
export default Bookmarks;