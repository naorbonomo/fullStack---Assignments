// form submission
function submitForm() {
    let formText = document.getElementById("formText").value;
    let formDate = document.getElementById("formDate").value;
    let formTime = document.getElementById("formTime").value;
    if (formText === "" || formDate === "" || formTime === "") {
        alert('Please fill in the complete form');
    } else {
        const note = { text: formText, date: formDate, time: formTime }; // no longer using an ID
        saveNoteToStorage(note);
        loadNotes(); // reload notes to refresh the IDs and display
        clearForm();
    }
}

// save note to local storage
function saveNoteToStorage(note) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// load notes from local storage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || []; // if there are no notes, default to an empty array.
    const container = document.getElementById('parentNotes');
    container.innerHTML = ''; // clear existing notes before reloading
    for (let i = 0; i < notes.length; i++) {
        addNoteToDOM(notes[i], i);
    }
}

// add note to DOM
function addNoteToDOM(note, index) {
    const container = document.getElementById('parentNotes');
    let insertNewDiv = document.createElement('div');
    insertNewDiv.className = 'notes';
    insertNewDiv.setAttribute('data-index', index); // use index as identifier

    const closeButton = document.createElement('button');
    closeButton.className = 'btn-close';
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.onclick = function() {
        removeNoteFromDOM(index);
    };
    insertNewDiv.appendChild(closeButton);

    const image = document.createElement('img');
    image.src = 'assets/notebg.png';
    insertNewDiv.appendChild(image);

    let text = document.createElement('span');
    text.className = 'text';
    text.innerText = note.text;

    let dateDiv = document.createElement('div');
    dateDiv.className = 'note-date';
    dateDiv.innerText = note.date;

    let timeDiv = document.createElement('div');
    timeDiv.className = 'note-time';
    timeDiv.innerText = note.time;

    insertNewDiv.appendChild(text);
    insertNewDiv.appendChild(dateDiv);
    insertNewDiv.appendChild(timeDiv);

    container.appendChild(insertNewDiv);
}

// remove note from DOM and local storage
function removeNoteFromDOM(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    if (index >= 0 && index < notes.length) {
        notes.splice(index, 1); // remove the note from the array by index
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes(); // reload notes to refresh the display
    }
}

// clear form fields
function clearForm() {
    document.getElementById("formText").value = '';
    document.getElementById("formDate").value = '';
    document.getElementById("formTime").value = '';
}

// load notes from local storage when the window loads
window.onload = function() {
    loadNotes();
};
