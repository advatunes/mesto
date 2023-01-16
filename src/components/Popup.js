export class Popup {
    constructor(popup) {
      this._popup = popup;
    }

    open() {
      this._popup.classList.add('popup_opened');

      document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(e) {
      if (e.key === 'Escape') {
        this.close();
      }
    }

    setEventListeners() {
      this._popup.addEventListener('mousedown', (event) => {
        const targetClassList = event.target.classList;
        if (targetClassList.contains('popup') || targetClassList.contains('popup__close-icon')) {
          this.close();
        }
      });
    }
  }