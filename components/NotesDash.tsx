"use client";
import { useEffect, useState } from "react";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";

const NotesDash = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  const addNote = (note: string) => {
    const newNotes = [...notes, note];
    setNotes(newNotes);
  };

  const editNote = (index: number, editedNote: string) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = editedNote;
    setNotes(updatedNotes);
  };

  const deleteNote = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    setNotes(storedNotes ? JSON.parse(storedNotes) : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes App</h1>
      <NoteForm addNote={addNote} />
      <NoteList
        notes={notes}
        onEdit={editNote}
        onDelete={deleteNote}
        editingIndex={editingIndex}
        setEditingIndex={setEditingIndex}
      />
    </div>
  );
};
export default NotesDash;
