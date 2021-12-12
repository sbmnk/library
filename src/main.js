'use strict';

let myLibrary = []

function Book(title,author,pages,read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
}
Book.prototype ={

  get writtenBy() {
    return `Written by ${this.author}`;
  },

  get numPages() {
    return `${this.pages} pages`;
  },

  get readStatus() {
    if (this.read){
      return 'Read'
    }
    return 'Not read'
  },
}

let myBooks = JSON.parse(localStorage.getItem('myLibrary'))
if (myBooks!=null){
  myLibrary = myBooks
  myBooks.forEach( function(book,idx){

    myLibrary[idx] = Object.setPrototypeOf(myLibrary[idx],Book.prototype)
  })
}

const container = document.getElementById('accordion');


function addBookToLibrary(book){
  myLibrary.push(book)
}
function showLibrary (){
  localStorage.setItem('myLibrary',JSON.stringify(myLibrary))
  container.innerHTML=""
  myLibrary.forEach( function(book,idx){
    const content = `
    <div class="card">

    <div id="book-${idx}" class="book" aria-labelledby="heading-${idx}" data-parent="#accordion">
    <div class="card-body">
    <h5>${book.title}</h5>
    <p>${book.writtenBy}</p>
    <p>${book.numPages}</p>
    <p>${book.readStatus}</>
    <button id='read_${idx}', onclick='changeBookRead(${idx})'>Change status</button>
    <button id='remove_book_${idx}', onclick='removeFromLibrary(${idx})'>Remove</button>
    </div>
    </div>
    </div>
    `;

  // Append newyly created card element to the container
  container.innerHTML += content;
})
}
function removeFromLibrary(book_id){
  myLibrary.splice(book_id,1)
  showLibrary()
}
function receiveForm(){

  const book = new Book(document.getElementById('title').value, document.getElementById('author').value,document.getElementById('pages').value,'not read yet')
  addBookToLibrary(book)
  showLibrary()
}
function showHideForm() {
  let disp = document.getElementById('new_book_form').style.display
  switch(disp){
    case 'block':
    document.getElementById('new_book_form').style.display = 'none'
    break;
    case 'none':
    document.getElementById('new_book_form').style.display = 'block'
    break;
  }
}
function changeBookRead(bookid){
  myLibrary[bookid].read = myLibrary[bookid].read==false
  showLibrary ()
}

showLibrary()

