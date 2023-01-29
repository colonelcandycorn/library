const addBookButton = document.querySelector('[data-add-book]');
const submit = document.querySelector('[data-new-book]');
const overlay = document.getElementById('overlay');

addBookButton.addEventListener('click', () => {
    const modal = document.querySelector(addBookButton.dataset.addBook);
    openModal(modal);
})

overlay.addEventListener('click', () => {
    const modal = document.querySelector(addBookButton.dataset.addBook);
    closeModal(modal);
})

submit.addEventListener('click', (e) => {
    let form = document.querySelector('#form');
    let author = document.querySelector('#author');
    let title = document.querySelector('#title');
    let pages = document.querySelector('#num');
    let readStatus = document.querySelector('#have-read');

    if (!author.value || !title.value || !pages.value) return;

    addBookToLibrary(title.value, author.value, pages.value, readStatus.checked);
    const modal = document.querySelector(addBookButton.dataset.addBook);
    closeModal(modal);
    form.reset();
})

function openModal(modal) {
    if (!modal) return;

    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (!modal) return;

    modal.classList.remove('active');
    overlay.classList.remove('active');
}
let myLibrary = [];

/* BOOK CLASS */
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.read = function () {
    this.read = false;
}

Book.prototype.drawBook = function () {
    let newBook = document.createElement('div');
    let title = document.createElement('p');
    let author = document.createElement('p');
    let pages = document.createElement('p');
    let readStatus = this.read ? 'Finished' : 'Still Reading'
    let button = document.createElement("button");
    let deleteButton = document.createElement("button");
    //read status button
    button.classList.add('read-button');
    if (this.read) button.classList.add('active');
    button.innerText = readStatus;
    //delete button
    deleteButton.classList.add('delete-button');
    deleteButton.innerText = 'Delete';

    title.textContent = `Title: ${this.title}`;
    author.textContent = `Author: ${this.author}`;
    pages.textContent = `Number of Pages: ${this.pages}`;
    newBook.classList.add('book-card');
    newBook.id = `${myLibrary.length - 1}`;
    newBook.append(title, author, pages, button, deleteButton);
    // add event listener to button
    button.addEventListener('click', (e) => {
        e.target.classList.toggle('active');
        e.target.innerText = e.target.classList.contains('active') ? 'Finished' : 'Still Reading';
        let index = e.target.closest('div').id;
        myLibrary[index].read = !myLibrary[index].read;
    });

    // add event listener to delete button
    deleteButton.addEventListener('click', (e) => {
        let index = e.target.closest('div').id;
        myLibrary.splice(parseInt(index), 1);
        drawLibrary();
    })
    container.append(newBook);
}


/* END OF CLASS */

function addBookToLibrary(title, author, pages, read) {
    let temp = new Book(title, author, pages, read);
    myLibrary.push(temp);
    drawLibrary();
}

const container = document.querySelector('.container');


function drawLibrary() {
    let oldLibrary = document.querySelectorAll('.book-card');
    oldLibrary.forEach(book => book.remove());
    myLibrary.forEach(book => book.drawBook());
}
