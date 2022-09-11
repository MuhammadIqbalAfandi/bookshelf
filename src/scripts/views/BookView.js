class BookView {
  addEventHandler({ onShow, onEdit, onDelete }) {
    document.querySelectorAll('.book__container').forEach((container) => {
      container.addEventListener('click', (event) => {
        event.stopPropagation()

        const id = Number(container.dataset.bookId)
        onShow(id)
      })
    })

    document.querySelectorAll('.book__read').forEach((cbx) => {
      cbx.addEventListener('click', (event) => {
        event.stopPropagation()

        const container = cbx.closest('.book__container')
        const id = Number(container.dataset.bookId)
        onEdit(id)
      })
    })

    document.querySelectorAll('.book__btnDelete').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation()

        const container = button.closest('.book__container')
        const id = Number(container.dataset.bookId)
        onDelete(id)
      })
    })
  }

  renderHtml({ id, title, author, year, isComplete }) {
    return `
      <section class="book__container" data-book-id="${id}">
        <div class="book__body">
          ${title ? `<h2 class="book__bodyTitle">${title}</h2>` : ''}
          ${author ? `<p class="book__bodyAuthor">${author}</p>` : ''}
          ${year ? `<p class="book__bodyYear">${year}</p>` : ''}
          <div class="book__read">
            <label for="bookRead" class="book__readLabelCheckbox">
              Selesai dibaca
            </label>
            <input id="bookRead" class="book__readCheckbox" type="checkbox" ${
              isComplete ? 'checked' : ''
            } />
          </div>
        </div>

        <aside class="book__btn">
          <button class="btn_icon book__btnDelete">
            <i class="icon_sm ph-trash"></i>
          </button>
        </aside>
      </section>
    `
  }
}

export default BookView
