import { initialCards } from './initialCards.js';

const popupNameElement = document.querySelector('.popup_name'),
  popupNameForm = popupNameElement.querySelector('.popup__form'),
  popupNameOpenButton = document.querySelector('.profile__edit-button'),
  popupNameCloseButton = popupNameElement.querySelector('.popup__close-icon'),
  //
  nameInput = popupNameElement.querySelector('.popup_name__input_field_name'),
  jobInput = popupNameElement.querySelector('.popup_name__input_field_job'),
  profileName = document.querySelector('.profile__name'),
  profileJob = document.querySelector('.profile__job'),
  //
  popupPlaceElement = document.querySelector('.popup_place'),
  popupPlaceForm = popupPlaceElement.querySelector('.popup__form'),
  popupPlaceOpenButton = document.querySelector('.profile__add-button'),
  popupPlaceCloseButton = popupPlaceElement.querySelector('.popup__close-icon'),
  //
  elementsContainer = document.querySelector('.elements'),
  placeInput = popupPlaceElement.querySelector('.popup_place__input_field_place'),
  linkInput = popupPlaceElement.querySelector('.popup_place__input_field_link'),
  //
  popupImageElement = document.querySelector('.popup_image'),
  popupImageCloseButton = popupImageElement.querySelector('.popup__close-icon'),
  popupImagePic = popupImageElement.querySelector('.popup_image__pic'),
  popupImageTitle = popupImageElement.querySelector('.popup_image__title');

// Открытие попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleKeyDown);
};

// Закрытие попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleKeyDown);
};

// Кнопки откр/закр профиля
popupNameOpenButton.addEventListener('click', () => {
  openPopup(popupNameElement);
});
popupNameCloseButton.addEventListener('click', () => {
  closePopup(popupNameElement);
});

// Кнопки откр/закр элементов
popupPlaceOpenButton.addEventListener('click', () => {
  openPopup(popupPlaceElement);
});
popupPlaceCloseButton.addEventListener('click', () => {
  closePopup(popupPlaceElement);
});

// Закрытие попапа по клавише Esc
const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};

// Перенос текстовых полей
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

const editProfileValue = (e) => {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupNameElement);
  e.preventDefault();
};

popupNameForm.addEventListener('submit', editProfileValue);

// Создание карточки
const elementTemplate = document.querySelector('#element-template').content;

const createCard = (data) => {
  let cardElement = elementTemplate.querySelector('.element').cloneNode(true),
    cardElementImage = cardElement.querySelector('.element__image'),
    cardElementTitle = cardElement.querySelector('.element__name');

  cardElementTitle.textContent = data.name;
  cardElementImage.src = data.link;

  // Вызов попапа увеличения картинки
  cardElementImage.addEventListener('click', () => {
    openPopup(popupImageElement);
    popupImageTitle.textContent = data.name;
    popupImagePic.src = data.link;
  });

  return cardElement;
};

// Закрытие попапа увеличения картинки
popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImageElement);
});

// Добавление карточки в верстку
const renderCard = (data, elementsContainer) => {
  let element = createCard(data);
  elementsContainer.prepend(element);

  // Удаление карточки
  let deleteButton = element.querySelector('.element__trash-icon');
  deleteButton.addEventListener('click', (e) => {
    e.target.closest('.element').remove();
  });
  // Лайки
  let likeButton = element.querySelector('.element__like');
  likeButton.addEventListener('click', (e) => {
    e.target.classList.toggle('element__like_active');
  });

  placeInput.value = '';
  linkInput.value = '';
};

initialCards.forEach((data) => {
  renderCard(data, elementsContainer);
});

const addCard = (e) => {
  e.preventDefault();
  let card = {
    name: placeInput.value,
    link: linkInput.value,
  };

  renderCard(card, elementsContainer);
  togglePopup(popupPlaceElement);
};

popupPlaceForm.addEventListener('submit', addCard);

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Проверка валидности

const hasValidInput = (inputList) => {
  return inputList.every((inputElement) => inputElement.validity.valid);
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Включение и отключение submit
const toggleButtonState = (inputList, buttonElement) => {
  if (hasValidInput(inputList)) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = '';
  } else {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = 'disabled';
  }
};

// Отображение ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  inputElement.classList.add(config.inputErrorClass);
};

// Скрытие ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// Добавление обработчиков
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  const { formSelector, ...rest } = config;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => e.preventDefault());
    setEventListeners(formElement);
  });
};

enableValidation(config);
