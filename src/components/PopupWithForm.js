import { Popup } from './Popup.js';
import { formValidatorPopupName } from '../pages/index.js';
import { formValidatorPopupPlace } from '../pages/index.js';

export class PopupWithForm extends Popup {
    constructor({ handleFormSubmit }, popupSelector) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
    }

    open() {
      super.open();
    }

    close() {
      super.close();
      formValidatorPopupName.clearValidation();
      formValidatorPopupName.clearFormInput();

      formValidatorPopupPlace.clearValidation();
      formValidatorPopupPlace.clearFormInput();
    }

    _getInputValues() {
      this._inputList = this._popupSelector.querySelectorAll('.popup__input');

      this._formValues = {};
      this._inputList.forEach((input) => {
        this._formValues[input.name] = input.value;
      });
      return this._formValues;
    }

    setEventListeners() {
      super.setEventListeners();
      this._popupSelector.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        this.close();
      });
    }
  }