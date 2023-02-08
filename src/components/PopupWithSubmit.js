import { Popup } from './Popup.js';


export class PopupWithSubmit extends Popup {
    constructor(popup, {handleSubmit}) {
      super(popup);
      this._handleSubmit = handleSubmit;
    }

    setEventListeners() {
      super.setEventListeners();
      this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleSubmit();
        this.close();
      });
    }
  }