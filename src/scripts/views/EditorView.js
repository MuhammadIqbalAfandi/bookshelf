class EditorView {
  #bookWriteHeader = document.querySelector('.bookWrite__header')
  #bookWriteHeaderInput = document.querySelector('.bookWrite__headerInput')
  #bookWriteBodyLayer = document.querySelector('.bookWrite__bodyLayer')
  #bookWriteBody = document.querySelector('.bookWrite__body')
  #bookWriteClose = document.querySelector('.bookWrite__btnClose')

  addEventHandler({ onSave }) {
    this.#bookWriteHeaderInput.addEventListener('click', () => this.editor())
    this.#bookWriteBodyLayer.addEventListener('click', () => this.editor())
    this.#bookWriteClose.addEventListener('click', () => this.editor())
    this.#bookWriteBodyLayer.addEventListener('click', () => onSave())
    this.#bookWriteClose.addEventListener('click', () => onSave())
  }

  editor() {
    this.#bookWriteHeader.classList.toggle('hide')
    this.#bookWriteBody.classList.toggle('hide')
    this.#bookWriteBodyLayer.classList.toggle('hide')
  }
}

export default EditorView
