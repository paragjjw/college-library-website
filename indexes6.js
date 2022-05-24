
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}
class AddBook {
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2)
            return false;
        return true;
    }

    show(type, text) {
        let message = document.getElementById('message');
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" style="position:sticky; top:0;" role="alert">
        <strong>Message: </strong> ${text}
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>`
        setTimeout(function () {
            message.innerHTML = '';
        }, 5000);
    }
    add(book) {
        let bookList = localStorage.getItem('bookList');
        let bookObj;
        if (bookList == null)
            bookObj = [];
        else
            bookObj = JSON.parse(bookList);
        bookObj.push(book);
        localStorage.setItem('bookList', JSON.stringify(bookObj));
        table.display();
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
}
class Table {
    display() {
        let bookList = localStorage.getItem('bookList');
        let bookObj;
        if (bookList == null)
            bookObj = [];
        else
            bookObj = JSON.parse(bookList);
        let tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';

        bookObj.forEach(function (element, index) {
            let uiString = `<tr id="row${index + 1}">
                     <td>${index + 1}</td>
                     <td>${element.name}</td>
                     <td>${element.author}</td>
                     <td>${element.type}</td>
                     <td><button onclick="table.deleteBtn(${index})" type="submit" class="btn btn-primary">Delete Book</button></td>
                    </tr>`
            tableBody.innerHTML += uiString;
        })
        // console.log(tableBody);
        if (bookObj.length == 10) {
            // tableBody = document.getElementById('table');
            // console.log(`${tableBody.clientHeight}`);
            tableBody.style.maxHeight = `${tableBody.clientHeight}px`;
            // console.log(tableBody.style.height);
            tableBody.style.overflow = 'scroll';
            // console.log(tableBody.style.overflow);
        }

    }

    deleteBtn(index) {
        let bookList = localStorage.getItem('bookList');
        let bookObj;
        if (bookList == null)
            bookObj = [];
        else
            bookObj = JSON.parse(bookList);
        bookObj.splice(index, 1);
        localStorage.setItem('bookList', JSON.stringify(bookObj));
        this.display();
    }
}
let table = new Table();
table.display();

//Add submit event listener to form
document.getElementById('libraryForm').addEventListener('submit', libraryFormSubmit);
function libraryFormSubmit(e) {
    e.preventDefault();
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;
    if (fiction.checked)
        type = fiction.value;
    else if (programming.checked)
        type = programming.value;
    else if (cooking.checked)
        type = cooking.value;
    let book = new Book(name, author, type);
    let display = new AddBook();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your book has been added successfully');
    } else {
        display.show('danger', 'Sorry! You cannot add this book');
    }
}
