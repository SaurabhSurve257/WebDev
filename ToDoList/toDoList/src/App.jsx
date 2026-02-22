import { useState } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [archivedNotes, setArchivedNotes] = useState([])
  const [subject, setSubject] = useState('')
  const [inputValue, setInputValue] = useState('')

  // Add a new note
  const addNote = () => {
    if (subject.trim() === '' || inputValue.trim() === '') {
      alert('Please enter both subject and description')
      return
    }
    
    const newNote = {
      id: Date.now(),
      subject: subject,
      text: inputValue,
      createdAt: new Date().toLocaleDateString()
    }
    
    setNotes([newNote, ...notes])
    setSubject('')
    setInputValue('')
  }

  // Archive a note
  const archiveNote = (id) => {
    const noteToArchive = notes.find(note => note.id === id)
    if (noteToArchive) {
      setNotes(notes.filter(note => note.id !== id))
      setArchivedNotes([noteToArchive, ...archivedNotes])
    }
  }

  // Delete a note permanently
  const deleteNote = (id, isArchived = false) => {
    if (isArchived) {
      setArchivedNotes(archivedNotes.filter(note => note.id !== id))
    } else {
      setNotes(notes.filter(note => note.id !== id))
    }
  }

  // Recover a note from archive
  const recoverNote = (id) => {
    const noteToRecover = archivedNotes.find(note => note.id === id)
    if (noteToRecover) {
      setArchivedNotes(archivedNotes.filter(note => note.id !== id))
      setNotes([noteToRecover, ...notes])
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addNote()
    }
  }

  return (
    <div className='app-container'>
      <div className='header'>
        <h1>📝 My Notes</h1>
        <p>Manage your daily notes with ease</p>
      </div>

      {/* Input Section */}
      <div className='input-section'>
        <input 
          type='text' 
          placeholder='Enter subject...'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className='note-input'
        />
        <input 
          type='text' 
          placeholder='Add a note description...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className='note-input'
        />
        <button onClick={addNote} className='btn btn-add'>ADD</button>
      </div>

      {/* Active Notes Section */}
      <div className='notes-section'>
        <h2>Active Notes ({notes.length})</h2>
        {notes.length === 0 ? (
          <p className='empty-message'>No active notes. Add one to get started! ✨</p>
        ) : (
          <div className='notes-list'>
            {notes.map((note) => (
              <div key={note.id} className='note-card'>
                <div className='note-content'>
                  <h3 className='note-subject'>{note.subject}</h3>
                  <p className='note-text'>{note.text}</p>
                  <span className='note-date'>{note.createdAt}</span>
                </div>
                <div className='note-actions'>
                  <button 
                    onClick={() => archiveNote(note.id)}
                    className='btn btn-archive'
                    title='Archive this note'
                  >
                    📦 Archive
                  </button>
                  <button 
                    onClick={() => deleteNote(note.id)}
                    className='btn btn-delete'
                    title='Delete permanently'
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Archived Notes Section */}
      <div className='notes-section archived-section'>
        <h2>Archived Notes ({archivedNotes.length})</h2>
        {archivedNotes.length === 0 ? (
          <p className='empty-message'>No archived notes yet</p>
        ) : (
          <div className='notes-list'>
            {archivedNotes.map((note) => (
              <div key={note.id} className='note-card archived-card'>
                <div className='note-content'>
                  <h3 className='note-subject'>{note.subject}</h3>
                  <p className='note-text'>{note.text}</p>
                  <span className='note-date'>{note.createdAt}</span>
                </div>
                <div className='note-actions'>
                  <button 
                    onClick={() => recoverNote(note.id)}
                    className='btn btn-recover'
                    title='Recover this note'
                  >
                    ↩️ Recover
                  </button>
                  <button 
                    onClick={() => deleteNote(note.id, true)}
                    className='btn btn-delete'
                    title='Delete permanently'
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
