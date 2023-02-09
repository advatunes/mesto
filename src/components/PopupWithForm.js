import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popup) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
    this._submit = this._popup.querySelector('.popup__submit');
    this._submitText = this._submit.textContent;
  }

  close() {
    this._form.reset();
    super.close();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  preload(isLoading) {
    if (isLoading) {
      this._submit.textContent = 'Сохранение..';
    } else {
      this._submit.textContent = this._submitText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
