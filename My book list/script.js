// Book class : Represent a book
class Book{
    constructor(title, author, isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}


// UI class: Handle UI Tasks
class UI {
    static displayBooks(){

        const books = Store.getbooks();

        books.forEach((book)=> UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="btn btn-danger btn-sm
                    delete">X</a></td>`;

        list.appendChild(row);
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const bookForm = document.querySelector('#book-form');
        const container = document.querySelector('.container');
        container.insertBefore(div, bookForm);

        //vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields(){
        document.querySelector('#title').value =  '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
}

// Store class: Handles storage
class Store{
    static getbooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books; 
    }

    static addBook(book){
        const books = Store.getbooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getbooks();

        books.forEach((book, index)=>{
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}


// Event : display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);


// Event : Add a book
document.querySelector('#book-form').addEventListener('submit', (e)=>{
    
    e.preventDefault();

    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //validate form values
    if(title == '' || author == '' || isbn == ''){
        UI.showAlert('Please fill all the fields', 'danger');
    }
    else{
        //Instatiate book
        const book = new Book(title, author, isbn);
    
        // add book to UI
        UI.addBookToList(book);

        //add book to store
        Store.addBook(book);

        UI.showAlert('Book added', 'success');

        //clear FIelds
        UI.clearFields();
    }
})


// Event : Remove a book
document.querySelector('#book-list').addEventListener('click', (e)=>{

    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Book Removed', 'success');
})