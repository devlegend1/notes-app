"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

const NoteList = ({
  notes,
  editingIndex,
  setEditingIndex,
  onEdit,
  onDelete,
}: {
  notes: string[];
  editingIndex: number;
  setEditingIndex: Dispatch<SetStateAction<number>>;
  onEdit: (index: number, note: string) => void;
  onDelete: (index: number) => void;
}) => {
  const [editNote, setEditNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<string[]>(notes);
  const [validationError, setValidationError] = useState("");

  const handleEditStart = (index: number, note: string) => {
    setEditingIndex(index);
    setEditNote(note);
  };

  const handleEditCancel = () => {
    setEditingIndex(-1);
    setEditNote("");
  };

  const handleEditSave = (index: number) => {
    if (editNote.length >= 20 && editNote.length <= 300) {
      onEdit(index, editNote);
      setEditingIndex(-1);
      setEditNote("");
      setValidationError("");
    } else {
      setValidationError("Note must be between 20 and 300 characters.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFilteredNotes(
        notes.filter((note) =>
          note.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, notes]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-2 text-gray-700"
      />
      <ul>
        {filteredNotes.map((note, index) => (
          <li key={index} className="mb-2">
            {editingIndex === index ? (
              <div>
                <textarea
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  className="w-full p-2 border rounded text-gray-700"
                  placeholder="Edit your note..."
                  maxLength={300}
                />
                {validationError && (
                  <p className="text-red-500 pb-2">{validationError}</p>
                )}
                <div className="mt-1">
                  <button
                    onClick={() => handleEditSave(index)}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="ml-2 px-2 py-1 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="border p-2 rounded">
                {note}
                <div className="mt-1">
                  <button
                    onClick={() => handleEditStart(index, note)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(index)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
