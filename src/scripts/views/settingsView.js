class SettingsView {
  updateSettings(data) {
    if (data.darkTheme) {
      document.body.classList.toggle('darkTheme')
    }
  }
}

export default new SettingsView()
