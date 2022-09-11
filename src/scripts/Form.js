class Form {
  getForm() {
    return {
      id: document.querySelector('.bookWrite__id').value || +new Date(),
      title: document.querySelector('.bookWrite__title').value,
      author: document.querySelector('.bookWrite__author').value,
      year: document.querySelector('.bookWrite__year').value,
      isComplete: document.querySelector('.bookWrite__readCheckbox').checked,
    }
  }

  setForm(book) {
    document.querySelector('.bookWrite__id').value = book.id
    document.querySelector('.bookWrite__title').value = book.title
    document.querySelector('.bookWrite__author').value = book.author
    document.querySelector('.bookWrite__year').value = book.year
    document.querySelector('.bookWrite__readCheckbox').checked = book.isComplete
  }

  clearForm() {
    document.querySelector('.bookWrite__id').value = ''
    document.querySelector('.bookWrite__title').value = ''
    document.querySelector('.bookWrite__author').value = ''
    document.querySelector('.bookWrite__year').value = ''
    document.querySelector('.bookWrite__readCheckbox').checked = false
  }
}

export default Form
