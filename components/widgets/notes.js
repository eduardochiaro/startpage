import { DocumentIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { getFromStorage, setToStorage } from "../../utils/localStorage";

const Notes = ({ size = 2 })  => {
  const [inputNew, setInputNew] = useState("");
  const [textareaNew, setTextareaNew] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Perform localStorage action
    const initial = getFromStorage("notes");
    setNotes(initial || []);
  }, []);

  const addNote = () => {
    notes.push({ title: "", content: "" });
    saveAndReset(notes);
    openNote( notes[notes.length -1], notes.length - 1);
  }

  const saveAndReset = (list) => {
    setToStorage("notes", list);
    setNotes(list);
  }

  const openNote = (note, index) => {
    setIsEditing(true);
    setInputNew(note.title || "Untitled Note");
    setTextareaNew(note.content);
    setSelectedNote(index);
  }

  const closeNote = () => {
    setIsEditing(false);
    setInputNew("");
    setTextareaNew("");
    setSelectedNote(null);
  }

  const deleteNote = (index) => {
    if (index > -1) {
      notes.splice(index, 1); // 2nd parameter means remove one item only
    }
    saveAndReset(notes);
    closeNote();
  }

  return (
    <div className={`rounded bg-white drop-shadow p-6 widget-col-${size}`}>
      <div className="flex">
        <h2 className="flex-auto text-2xl inline-block">Notes</h2>
        <a onClick={() => addNote()} className="text-sky-500 hover:text-sky-800"><PlusCircleIcon className=" h-6 w-6 mr-2 cursor-pointer" /></a>
      </div>
      <div className="flex">
        <div className="flex-none w-1/4">
          { notes.map((note, index) => (
            <div key={index} className="flex items-center rounded-lg mr-4 hover:bg-gray-100 p-2 mt-2 cursor-pointer" onClick={ () => openNote(note, index) }>
             <DocumentIcon className="h-8 mr-2 inline-block" />
            <p className="truncate w-96">{ note.title || "Untitled note" }</p>
            </div>
          )) }
        </div>
        <div className="grow">
          { isEditing && (
            <>
            <div className="flex items-center border-b-4 border-sky-500">
              <input 
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                type="text" 
                placeholder="Note title..."
                onChange={ (event) => setInputNew(event.target.value) }
                value={ inputNew }
                autoComplete="off"
                data-lpignore="true" 
                data-form-type="other"
                required
                />
            </div>
            <textarea
              className="appearance-none bg-transparent border border-solid rounded border-gray-300 w-full text-gray-700 mr-3 py-1 px-2 mt-4 leading-tight focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none"
              placeholder="Note content..."
              onChange={ (event) => setTextareaNew(event.target.value) }
              value={ textareaNew }
              autoComplete="off"
              rows={15}
              />
              <div className="text-right mt-2">
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={ () => closeNote() }>Close</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={ () => deleteNote(selectedNote) }>Delete</button>
                <button
                  className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={ () => {
                    saveAndReset(notes.map((note, index) => index === selectedNote ? { title: inputNew, content: textareaNew } : note));
                  } }
                  >Save</button>
              </div>
            </>
          ) }
        </div>
      </div>
    </div>
  )
}

export default Notes;