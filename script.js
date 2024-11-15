//select Dom elments
const noteInput = document.getElementById('noteInput');
const addNoteButton = document.getElementById('addNoteButton');
const notesContainer = document.getElementById('notesContainer');

// Load notes from localstorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];
renderNotes();

//Function render notes
function renderNotes() {
    notesContainer.innerHTML= '';
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
            <span class="note-content" contenteditable="false" >${note}</span>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
            `;
            notesContainer.appendChild(noteElement);

            //Event listener
            noteElement.querySelector('.deleteBtn').addEventListener('click', () => {
                deleteNote(index)
            })

            //Event listener
            noteElement.querySelector('.editBtn').addEventListener('click', (e) => {
                toggleEditMode(e, index)
            })

    })
}

addNoteButton.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText) {
        notes.push(noteText);
        saveNotes();
        renderNotes();
        noteInput.value='';
    }
})


function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

function toggleEditMode(event, index) {
    event.stopPropagation();
    const noteElement = event.target.closest('.note');
    const noteContent = noteElement.querySelector('.note-content');

    if (noteContent.isContentEditable) {
        notes[index] = noteContent.textContent.trim();
        saveNotes();
        noteContent.contentEditable = "false";
        event.target.textContent = 'Edit';
    } else {
        noteContent.contentEditable = "true";
        event.target.textContent = 'Save'
    }

}

function saveNotes(){
    localStorage.setItem('notes', JSON.stringify(notes));
}