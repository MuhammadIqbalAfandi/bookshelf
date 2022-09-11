class DialogView {
  addEventHandler(onOk) {
    const dialogLayer = document.querySelector('.dialog__layer')
    const dialogBtnCancel = document.querySelector('.dialog__btnCancel')
    const dialogBtnOk = document.querySelector('.dialog__btnOk')

    dialogLayer.classList.remove('hide')
    dialogBtnCancel.addEventListener(
      'click',
      () => {
        dialogLayer.classList.add('hide')
      },
      { once: true }
    )
    dialogBtnOk.addEventListener(
      'click',
      () => {
        onOk()
        dialogLayer.classList.add('hide')
      },
      { once: true }
    )
  }

  updateDialog({ message, labelCancel = 'Cancel', labelOk = 'Ok' }) {
    document.querySelector('.dialog__message').textContent = message
    document.querySelector('.dialog__btnCancel').textContent = labelCancel
    document.querySelector('.dialog__btnOk').textContent = labelOk
  }

  renderHtml() {
    return `
      <div class="dialog__layer hide">
        <div class="dialog">
          <p class="dialog__message"></p>

          <div class="dialog__btnContainer">
            <button class="dialog__btn dialog__btnCancel" type="button">
            </button>
            <button class="dialog__btn dialog__btnOk" type="button"></button>
          </div>
        </div>
      </div>
    `
  }
}

export default DialogView
