"use client";
import { useState, useEffect } from "react";

const NoteForm = ({ addNote }: { addNote: (note: string) => void }) => {
  const [note, setNote] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (note.length >= 20 && note.length <= 300) {
      addNote(note);
      setNote("");
      setValidationError("");
    } else {
      setValidationError("Note must be between 20 and 300 characters.");
    }
  };

  const handleNoteChange = (newNote: string) => {
    setNote(newNote);
    if (newNote.length >= 20 && newNote.length <= 300) {
      setValidationError("");
    } else {
      setValidationError("Note must be between 20 and 300 characters.");
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded mb-4 p-4"
      onSubmit={handleSubmit}
    >
      <textarea
        className="shadow appearance-none border rounded w-full p-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
        value={note}
        placeholder="Enter a new note..."
        onChange={(e) => handleNoteChange(e.target.value)}
        maxLength={300}
      />
      {validationError && (
        <p className="text-red-500 pb-2">{validationError}</p>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
