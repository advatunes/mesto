export class Popup {
  constructor(popup) {
    this._popup = popup;
    this.escClose = this._handleEscClose.bind(this);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (event) => {
      const targetClassList = event.target.classList;
      if (targetClassList.contains('popup') || targetClassList.contains('popup__close-icon')) {
        this.close();
      }
    });
  }

  open() {
    document.addEventListener('keydown', this.escClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this.escClose);
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
}
