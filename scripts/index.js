import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { config } from './config.js';
import { FormValidator } from './FormValidator.js';

const popupNameElement = document.querySelector('.popup-name'),
  popupNameForm = popupNameElement.querySelector('.popup__form'),
  popupNameOpenButton = document.querySelector('.profile__edit-button'),
  closeButtons = document.querySelectorAll('.popup__close-icon'),
  //
  nameInput = popupNameElement.querySelector('.popup-name__input-name'),
  jobInput = popupNameElement.querySelector('.popup-name__input-job'),
  profileName = document.querySelector('.profile__name'),
  profileJob = document.querySelector('.profile__job'),
  //
  popupPlaceElement = document.querySelector('.popup-place'),
  popupPlaceForm = popupPlaceElement.querySelector('.popup__form'),
  popupPlaceOpenButton = document.querySelector('.profile__add-button'),
  // popupPlaceCloseButton = popupPlaceElement.querySelector('.popup__close-icon'),
  //
  elementsContainer = document.querySelector('.elements'),
  placeInput = popupPlaceElement.querySelector('.popup-place__input-place'),
  linkInput = popupPlaceElement.querySelector('.popup-place__input-link'),
  //
  popupImageElement = document.querySelector('.popup-image'),
  // popupImageCloseButton = popupImageElement.querySelector('.popup__close-icon'),
  popupImagePic = popupImageElement.querySelector('.popup-image__pic'),
  popupImageTitle = popupImageElement.querySelector('.popup-image__title');

// Открытие попапа
const openPopup = (popup) => {
  clearValidation(popup);
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleKeyDown);
  popup.addEventListener('mousedown', handleOutsideClick);
};

// Закрытие попапа
const closePopup = (popup) => {
  clearFormInput(popup);
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleKeyDown);
  popup.removeEventListener('mousedown', handleOutsideClick);
};

// Очистка инпутов
const clearFormInput = (popup) => {
  let inputs = popup.querySelectorAll('input');
  inputs.forEach((input) => (input.value = ''));
};

// Очистка ошибок валидации
const clearValidation = (popup) => {
  let errorsSpan = popup.querySelectorAll('.popup__error');
  errorsSpan.forEach((error) => error.classList.remove('popup__error_visible'));
  let errorsInput = popup.querySelectorAll('input');
  errorsInput.forEach((error) => error.classList.remove('popup__input_type_error'));
};

// Кнопки откр попапа профиля
popupNameOpenButton.addEventListener('click', () => {
  openPopup(popupNameElement);
  // Перенос текстовых полей
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

// Кнопки откр попапа добавления элементов
popupPlaceOpenButton.addEventListener('click', () => {
  openPopup(popupPlaceElement);
});

// Кнопки закрытия
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Закрытие попапа по клавише Esc
function handleKeyDown(e) {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// Закрытие попапа по клику

const handleOutsideClick = (e) => {
  if (!e.target.closest('.popup__container')) {
    closePopup(e.target);
  }
};

const editProfileValue = (e) => {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupNameElement);
  e.preventDefault();
};

popupNameForm.addEventListener('submit', editProfileValue);

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

  e.target.reset();
  renderCard(card, elementsContainer);
  closePopup(popupPlaceElement);
};

popupPlaceForm.addEventListener('submit', addCard);

// Вызов валидации
const formValidate = (() => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(config, formElement);
    formValidator.enableValidation();
  });
})();
