class NavbarView {
  #navbarMenuShow = document.querySelector('.navbarMenu')
  #navbarMenuLayer = document.querySelector('.navbarMenu__layer')

  addEventHandler({ onUpdateTheme, onSearch, onNavigation }) {
    document
      .querySelector('.navbar__btnHamburger')
      .addEventListener('click', () => this.#mobileMenu())

    this.#navbarMenuLayer.addEventListener('click', () => this.#mobileMenu())

    document
      .querySelector('.navbar__toggleTheme')
      .addEventListener('click', () => {
        onUpdateTheme()
      })

    document
      .querySelector('.navbar__searchInput')
      .addEventListener('input', (event) => {
        onSearch(event.target.value)
      })

    document
      .querySelectorAll('.navbarMenu__btn')
      .forEach((navigationButton) => {
        navigationButton.addEventListener('click', () => {
          const navigationMenu = navigationButton.dataset.menu
          onNavigation(navigationMenu)
        })
      })
  }

  #mobileMenu() {
    this.#navbarMenuShow.classList.toggle('navbarMenu_show')
    this.#navbarMenuLayer.classList.toggle('hide')
  }
}

export default NavbarView
