import { useState, useEffect } from "react";
import { GlobeIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
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
      const urlObject = new URL(inputNew);

      bookmarks.push({ title: urlObject.hostname ,url: inputNew });
      saveAndReset(bookmarks);
    }
  }

  const saveAndReset = (list) => {
    setToStorage("bookmarks", list);
    setBookmarks(list);
    setInputNew("");
  }

  const removeBookmark = (index) => {
    if (index > -1) {
      bookmarks.splice(index, 1); // 2nd parameter means remove one item only
    }
    saveAndReset(bookmarks);
  }

  return (
  <div className={`rounded bg-white drop-shadow p-6 col-span-${size}`}>
    <details>
      <summary className="cursor-pointer"><h2 className="text-2xl inline-block">Bookmarks</h2></summary>
      <form className="w-full">
        <div className="flex items-center border-4 rounded-xl border-sky-500 py-2 mt-4">
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
            className="flex-shrink-0 text-sm text-white py-1 px-2 rounded" 
            type="button"
            onClick={ () => grabBookmark() }
            >
            <PlusIcon className="h-6 inline-block text-sky-500 hover:text-sky-800"/>
          </button>
        </div>
      </form>
    </details>
    <div className="mt-4 relative grid gap-6 sm:gap-8 border-t pt-4">
      { bookmarks?.map((item, key) => 
      <div className="-m-3 p-3 rounded-lg hover:bg-gray-50 relative" key={key}>
        <Link
          href={item.url}>
          <a className="flex items-start " target="_blank">
            <GlobeIcon className="flex-shrink-0 h-6 w-6 text-sky-600" aria-hidden="true" />
            <div className="ml-4">
              <p className="text-base font-medium text-gray-900">{item.title}</p>
              <p className="mt-1 text-sm text-gray-500 truncate w-96">{item.url}</p>
            </div>
          </a>
        </Link>
        <Link
          href="#">
            <a 
              className="absolute right-2 top-6 text-sky-500 hover:text-sky-800 "
              onClick={ () => removeBookmark(key) }>
              <TrashIcon className="h-6" />
            </a>
        </Link>
      </div>
      ) }
    </div>
  </div>
  )
}
export default Bookmarks;