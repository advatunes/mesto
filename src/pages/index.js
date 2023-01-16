import '../pages/index.css';

import { initialCards } from '../utils/constants.js';
import { config } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';

import {
  popupNameElement,
  popupNameForm,
  popupNameOpenButton,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  popupPlaceElement,
  popupPlaceForm,
  popupPlaceOpenButton,
  elementsContainer,
  popupImageElement,
} from '../utils/constants.js';

// Вызов валидации

export const formValidatorPopupName = new FormValidator(config, popupNameForm);
formValidatorPopupName.enableValidation();
export const formValidatorPopupPlace = new FormValidator(config, popupPlaceForm);
formValidatorPopupPlace.enableValidation();

const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};

// Добавление карточки в верстку
const renderCard = (data) => {
  const card = new Card(data, '#element-template', handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
};

const addCard = (card) => {
  cardList.addItem(card);
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      renderCard(item);
      addCard(renderCard(item));
    },
  },

  elementsContainer
);

cardList.renderItems();

const userData = new UserInfo({ profileName, profileJob });

const popupImage = new PopupWithImage(popupImageElement);
popupImage.setEventListeners();

const popupName = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      userData.setUserInfo(data);
    },
  },
  popupNameElement
);

popupName.setEventListeners();

popupNameOpenButton.addEventListener('click', () => {
  popupName.open();
  nameInput.value = userData.getUserInfo().profileName;
  jobInput.value = userData.getUserInfo().profileJob;
  formValidatorPopupName.clearValidation()
});

const popupPlace = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      let card = {
        name: data.place,
        link: data.link,
      };
      renderCard(card);
      addCard(renderCard(card));
    },
  },
  popupPlaceElement
);

popupPlace.setEventListeners();

popupPlaceOpenButton.addEventListener('click', () => {
  popupPlace.open();
  formValidatorPopupPlace.toggleSubmitBtn();
  formValidatorPopupPlace.clearValidation()
});
