import { DATABASE_BOOK } from './../config.js'

class BookStore {
  static books() {
    const books = JSON.parse(localStorage.getItem(DATABASE_BOOK) ?? '[]')
    books.sort((a, b) => (a.id > b.id ? -1 : 1))

    return books
  }

  static save(book) {
    const books = BookStore.books()
    books.push(book)

    localStorage.setItem(DATABASE_BOOK, JSON.stringify(books))
  }

  static show(id) {
    return BookStore.books().find((value) => value.id === id)
  }

  static edit(id, book) {
    const books = BookStore.books()
    const existing = books.find((value) => value.id === id)

    if (book !== undefined) {
      existing.title = book.title
      existing.author = book.author
      existing.year = book.year
      existing.isComplete = book.isComplete
    } else {
      existing.isComplete = !existing.isComplete
    }

    localStorage.setItem(DATABASE_BOOK, JSON.stringify(books))
  }

  static delete(id) {
    const books = BookStore.books().filter((value) => value.id !== id)

    localStorage.setItem(DATABASE_BOOK, JSON.stringify(books))
  }
}

export default BookStore
