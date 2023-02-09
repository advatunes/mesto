import { Popup } from './Popup.js';

export class PopupWithSubmit extends Popup {
  constructor(popup) {
    super(popup);
    this._submit = this._popup.querySelector('.popup__submit');
    this._submitText = this._submit.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }

  preload(isLoading) {
    if (isLoading) {
      this._submit.textContent = 'Удаление..';
    } else {
      this._submit.textContent = this._submitText;
    }
  }

  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }
}
