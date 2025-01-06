//personalise logo
const logo = document.getElementById('head-logo');
window.addEventListener('DOMContentLoaded', ()=>{
    const name = localStorage.getItem('name');
    if(name !== null && name !== undefined){
        logo.textContent = name + "'s Life"
    }
});

//init vague vars
const examplePage = document.getElementById('example-page');


//add notes
const allNotes = document.querySelector('.notes');

function AddNote(){
    examplePage.style.display = 'none';
    //note
    const newNote = document.createElement('div');
    newNote.classList.add('page');
    allNotes.appendChild(newNote);
    //margin
    const margin = document.createElement('div');
    margin.classList.add('margin');
    newNote.appendChild(margin);
    //text
    const text = document.createElement('p');
    text.contentEditable = true;
    newNote.appendChild(text);
    //date
    const dateEl = document.createElement('p');
    dateEl.classList.add('date');
    const today = new Date();
    //format date and time
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
    let formattedDate = today.toLocaleString('en-US', options);

    let commaCount = 0;
    let finalFormattedDate = '';
    for (let i = 0; i < formattedDate.length; i++) {
    if (formattedDate[i] === ',') {
        commaCount++;
        if (commaCount === 1) {
        continue;
        } else if (commaCount === 2) {
        finalFormattedDate += ' @';
        continue;
        }
    }
    finalFormattedDate += formattedDate[i];
    }

    dateEl.textContent = finalFormattedDate;
    newNote.appendChild(dateEl);
    //delete but
    const deleteBut = document.createElement('button');
    deleteBut.textContent = 'Delete';
    deleteBut.classList.add('delete-btn');
    newNote.appendChild(deleteBut);
        //delete functionality
    deleteBut.addEventListener('click', ()=>{
        allNotes.removeChild(newNote);
        if (allNotes.childElementCount <= 1){
            examplePage.style.display = 'block';
        }
    });
    //save but
    const saveBut = document.createElement('button');
    saveBut.textContent = 'Save';
    saveBut.classList.add('save-btn');
    newNote.appendChild(saveBut);
    saveBut.addEventListener('click', ()=>{
        if (text.textContent.trim() != ''){
            SaveNote(text.textContent, dateEl.textContent)
            text.contentEditable = false;
            deleteBut.style.display = 'none';
            saveBut.style.display = 'none';
        }
    });
}

//SAVE FUNCTION
function SaveNote(text, date){ 
    const noteText = {
        text: text,
        date: date
    };

    let notesList = JSON.parse(localStorage.getItem('notes')) || [];
    notesList.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notesList));
}


function FetchNotes() {
    let notesList = JSON.parse(localStorage.getItem('notes')) || [];
    const notesContainer = document.querySelector('.notes');  
    notesList.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('page');

        const marginDiv = document.createElement('div');
        marginDiv.classList.add('margin');

        const noteText = document.createElement('p');
        noteText.textContent = note.text;

        const noteDate = document.createElement('p');
        noteDate.classList.add('date');
        noteDate.textContent = note.date; 

        noteDiv.appendChild(marginDiv);
        noteDiv.appendChild(noteText);
        noteDiv.appendChild(noteDate);

        notesContainer.appendChild(noteDiv);
    });
    if(notesList.length != 0){
        examplePage.style.display = 'none';
    }
}

FetchNotes();