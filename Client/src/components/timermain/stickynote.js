import React, { useState } from 'react';
import './stickynote.css';

const StickyNote = () => {
  const [notes, setNotes] = useState([]);

  const handleNoteChange = (id, event) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content: event.target.value } : note
    );
    setNotes(updatedNotes);
  };

  const handleBulletChange = (noteId, bulletIndex, event) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId
        ? {
            ...note,
            bullets: note.bullets.map((bullet, index) =>
              index === bulletIndex ? event.target.value : bullet
            ),
          }
        : note
    );
    setNotes(updatedNotes);
  };

  const addBullet = (noteId) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, bullets: [...note.bullets, ''] } : note
    );
    setNotes(updatedNotes);
  };

  const addNote = () => {
    const newNote = { id: Date.now(), content: '', bullets: [] };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  return (
    <div className="sticky-notes-container">
      {notes.map((note) => (
        <div key={note.id} className="sticky-note">
          <button className="delete" onClick={() => deleteNote(note.id)}>X</button>
          <textarea
            value={note.content}
            onChange={(event) => handleNoteChange(note.id, event)}
            placeholder="Enter note content..."
          />
          <ol>
            {note.bullets.map((bullet, index) => (
              <li key={index}>
                <span>{index + 1}.</span>
                <input
                  type="text"
                  value={bullet}
                  onChange={(event) =>
                    handleBulletChange(note.id, index, event)
                  }
                  placeholder="Enter bullet point..."
                />
              </li>
            ))}
          </ol>
          <button className="bull" onClick={() => addBullet(note.id)}>Add Bullets</button>
        </div>
      ))}
      <button className="note" onClick={addNote}>Add Note</button>
    </div>
  );
};

export default StickyNote;
