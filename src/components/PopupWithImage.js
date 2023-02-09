import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._imagePic = this._popup.querySelector('.popup-image__pic');
    this._imageTitle = this._popup.querySelector('.popup-image__title');
  }

  open(name, link) {
    super.open();
    this._imageTitle.textContent = name;
    this._imagePic.src = link;
    this._imagePic.alt = name;
  }
}


