import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { config } from './config.js';
import { FormValidator } from './FormValidator.js';

const popupNameElement = document.querySelector('.popup-name'),
  popupNameForm = popupNameElement.querySelector('.popup__form'),
  popupNameOpenButton = document.querySelector('.profile__edit-button'),
  nameInput = popupNameElement.querySelector('.popup-name__input-name'),
  jobInput = popupNameElement.querySelector('.popup-name__input-job'),
  profileName = document.querySelector('.profile__name'),
  profileJob = document.querySelector('.profile__job'),
  //
  popupPlaceElement = document.querySelector('.popup-place'),
  popupPlaceForm = popupPlaceElement.querySelector('.popup__form'),
  popupPlaceOpenButton = document.querySelector('.profile__add-button'),
  elementsContainer = document.querySelector('.elements'),
  placeInput = popupPlaceElement.querySelector('.popup-place__input-place'),
  linkInput = popupPlaceElement.querySelector('.popup-place__input-link'),
  //
  popupImageElement = document.querySelector('.popup-image'),
  popupImagePic = popupImageElement.querySelector('.popup-image__pic'),
  popupImageTitle = popupImageElement.querySelector('.popup-image__title'),
  //все попапы на странице
  popupList = Array.from(document.querySelectorAll('.popup'));

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
