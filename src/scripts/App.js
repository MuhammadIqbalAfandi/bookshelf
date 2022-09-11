import { DATABASE_THEME, APP } from './config.js'
import BookStore from './store/BookStore.js'
import BookView from './views/BookView.js'
import EditorView from './views/EditorView.js'
import NavbarView from './views/NavbarView.js'
import DialogView from './views/DialogView.js'
import Form from './Form.js'

class App {
  #bookRead = document.querySelector('.bookRead')
  #bookUnread = document.querySelector('.bookUnread')
  #bookTitleRead = document.querySelector('.book__titleRead')
  #bookTitleUnread = document.querySelector('.book__titleUnread')
  #bookView
  #editorView
  #navbarView
  #dialogView

  constructor() {
    this.#bookView = new BookView()
    this.#editorView = new EditorView()
    this.#navbarView = new NavbarView()
    this.#dialogView = new DialogView()

    this.#loadSettings()
    this.#renderHTML()
    this.#editorView.addEventHandler(this.#handlers())
    this.#navbarView.addEventHandler(this.#handlers())
    document.body.insertAdjacentHTML('beforeend', this.#dialogView.renderHtml())
  }

  #renderHTML(filteredBooks) {
    const bookReadMasonry = this.#bookRead.querySelector('.masonry-grid')
    const bookUnreadMasonry = this.#bookUnread.querySelector('.masonry-grid')

    bookReadMasonry.innerHTML = ''
    bookUnreadMasonry.innerHTML = ''

    const books = filteredBooks ?? BookStore.books()
    books.forEach((book) => {
      const template = this.#bookView.renderHtml(book)

      if (book.isComplete) {
        bookReadMasonry.insertAdjacentHTML('beforeend', template)
      } else {
        bookUnreadMasonry.insertAdjacentHTML('beforeend', template)
      }
    })

    this.#bookView.addEventHandler(this.#handlers())
  }

  #handlers() {
    return {
      onSearch: (search) => {
        const books = BookStore.books()
        const filteredBooks = books.filter((book) => {
          return (
            book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search)
          )
        })

        this.#renderHTML(filteredBooks)
      },
      onUpdateTheme: () => {
        APP.settings.darkTheme = !APP.settings.darkTheme

        document.body.classList.toggle('dark-theme')
      },
      onNavigation: (menu) => {
        const books = BookStore.books()
        const filteredBooks = books.filter((book) => {
          if (menu === 'book-read') {
            this.#bookTitleUnread.classList.add('hide')
            this.#bookUnread.classList.add('hide')
            this.#bookTitleRead.classList.remove('hide')
            this.#bookRead.classList.remove('hide')

            return book.isComplete === true
          } else if (menu === 'book-unread') {
            this.#bookTitleRead.classList.add('hide')
            this.#bookRead.classList.add('hide')
            this.#bookTitleUnread.classList.remove('hide')
            this.#bookUnread.classList.remove('hide')

            return book.isComplete === false
          } else {
            this.#bookTitleRead.classList.remove('hide')
            this.#bookRead.classList.remove('hide')
            this.#bookTitleUnread.classList.remove('hide')
            this.#bookUnread.classList.remove('hide')

            return book
          }
        })

        this.#renderHTML(filteredBooks)
      },
      onShow: (id) => {
        const book = BookStore.show(id)
        const form = new Form()
        form.setForm(book)

        this.#editorView.editor()
      },
      onEdit: (id, book) => {
        BookStore.edit(id, book)

        this.#renderHTML()
      },
      onDelete: (id) => {
        this.#dialogView.updateDialog({
          message: 'Hapus catatan secara permanen?',
        })
        this.#dialogView.addEventHandler(() => {
          BookStore.delete(id)
          this.#renderHTML()
        })
      },
      onSave: () => {
        const form = new Form()
        const book = form.getForm()
        const id = Number(book.id)
        const title = book.title

        const bookExists = BookStore.show(id) ?? null

        if (bookExists !== null) {
          BookStore.edit(id, book)
        } else if (title !== '') {
          BookStore.save(book)
        }

        form.clearForm()

        this.#renderHTML()
      },
    }
  }

  #loadSettings() {
    const settings = JSON.parse(
      localStorage.getItem(DATABASE_THEME) ?? JSON.stringify(APP.settings)
    )
    APP.settings = settings

    this.#updateSettings()

    onbeforeunload = () => {
      localStorage.setItem(DATABASE_THEME, JSON.stringify(APP.settings))
    }
  }

  #updateSettings() {
    if (APP.settings.darkTheme) {
      document.body.classList.toggle('dark-theme')
    }
  }
}

export default App
