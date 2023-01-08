import '../pages/index.css'

import { initialCards } from '../scripts/initialCards.js';
import { Card } from '../scripts/Card.js';
import { config } from '../scripts/config.js';
import { FormValidator } from '../scripts/FormValidator.js';

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
  linkInput,
  popupImageElement,
  popupImagePic,
  popupImageTitle,
  popupList
} from '../utils/constants.js'

// Закрытие попапа по клику
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    const targetClassList = event.target.classList;
    if (targetClassList.contains('popup') || targetClassList.contains('popup__close-icon')) {
      closePopup(popup);
    }
  });
});

// Открытие попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeyDown);
};

// Закрытие попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeyDown);
};

// Открытие попапа профиля
popupNameOpenButton.addEventListener('click', () => {
  openPopup(popupNameElement);
  // сброс инпутов и ошибки валидации
  formValidatorPopupName.clearValidation();
  formValidatorPopupName.clearFormInput();

  // Перенос текстовых полей
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// Открытие попапа добавления элементов
popupPlaceOpenButton.addEventListener('click', () => {
  openPopup(popupPlaceElement);
  // сброс инпутов и ошибки валидации
  formValidatorPopupPlace.clearValidation();
  formValidatorPopupPlace.clearFormInput();
  // переключение сабмита
  formValidatorPopupPlace.toggleSubmitBtn();
});

// Закрытие попапа по клавише Esc
function handleKeyDown(e) {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

const editProfileValue = (e) => {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupNameElement);
  e.preventDefault();
};

// Увеличение картинки

const handleCardOpen = (name, link) => {
  openPopup(popupImageElement);
  popupImageTitle.textContent = name;
  popupImagePic.src = link;
  popupImagePic.alt = name;
};

// Добавление карточки в верстку
const renderCard = (data, elementsContainer) => {
  const card = new Card(data, '#element-template', handleCardOpen);
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);
};

initialCards.forEach((data) => {
  renderCard(data, elementsContainer, handleCardOpen);
});

const addCard = (e) => {
  e.preventDefault();
  const card = {
    name: placeInput.value,
    link: linkInput.value,
  };

  renderCard(card, elementsContainer);
  closePopup(popupPlaceElement);
  e.target.reset();
};

// Слушатели кнопок submit
popupNameForm.addEventListener('submit', editProfileValue);
popupPlaceForm.addEventListener('submit', addCard);

// Вызов валидации

const formValidatorPopupName = new FormValidator(config, popupNameForm);
formValidatorPopupName.enableValidation();
const formValidatorPopupPlace = new FormValidator(config, popupPlaceForm);
formValidatorPopupPlace.enableValidation();
