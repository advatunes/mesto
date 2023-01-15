import { Popup } from './Popup.js';

import {
    popupImagePic,
    popupImageTitle,
  } from '../utils/constants.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
    }

    open(name, link) {
      super.open();
      popupImageTitle.textContent = name;
      popupImagePic.src = link;
      popupImagePic.alt = name;
    }
    setEventListeners() {
      super.setEventListeners();
    }
  }