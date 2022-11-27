import { initialCards } from './initialCards.js';

const popupNameElement = document.querySelector('.popup-name'),
  popupNameForm = popupNameElement.querySelector('.popup__form'),
  popupNameOpenButton = document.querySelector('.profile__edit-button'),
  popupNameCloseButton = popupNameElement.querySelector('.popup__close-icon'),
  //
  nameInput = popupNameElement.querySelector('.popup-name__input-name'),
  jobInput = popupNameElement.querySelector('.popup-name__input-job'),
  profileName = document.querySelector('.profile__name'),
  profileJob = document.querySelector('.profile__job'),
  //
  popupPlaceElement = document.querySelector('.popup-place'),
  popupPlaceForm = popupPlaceElement.querySelector('.popup__form'),
  popupPlaceOpenButton = document.querySelector('.profile__add-button'),
  popupPlaceCloseButton = popupPlaceElement.querySelector('.popup__close-icon'),
  //
  elementsContainer = document.querySelector('.elements'),
  placeInput = popupPlaceElement.querySelector('.popup-place__input-place'),
  linkInput = popupPlaceElement.querySelector('.popup-place__input-link'),
  //
  popupImageElement = document.querySelector('.popup-image'),
  popupImageCloseButton = popupImageElement.querySelector('.popup__close-icon'),
  popupImagePic = popupImageElement.querySelector('.popup-image__pic'),
  popupImageTitle = popupImageElement.querySelector('.popup-image__title');

// Открытие/закрытие попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

// Кнопки откр/закр профиля
popupNameOpenButton.addEventListener('click', () => {
  // Перенос текстовых полей
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

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
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true),
    cardElementImage = cardElement.querySelector('.element__image'),
    cardElementTitle = cardElement.querySelector('.element__name');

  cardElementTitle.textContent = data.name;
  cardElementImage.src = data.link;
  cardElementImage.alt = data.name;
  // Вызов попапа увеличения картинки

  cardElementImage.addEventListener('click', () => {
    openPopup(popupImageElement);
    popupImageTitle.textContent = data.name;
    popupImagePic.src = data.link;
    popupImagePic.alt = data.name;
  });

  // Лайки
  const likeButton = cardElement.querySelector('.element__like');
  likeButton.addEventListener('click', (e) => {
    e.target.classList.toggle('element__like_active');
  });

  // Удаление карточки
  const deleteButton = cardElement.querySelector('.element__trash-icon');
  deleteButton.addEventListener('click', (e) => {
    e.target.closest('.element').remove();
  });
  return cardElement;
};

// Закрытие попапа увеличения картинки
popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImageElement);
});

// Добавление карточки в верстку
const renderCard = (data, elementsContainer) => {
  const element = createCard(data);
  elementsContainer.prepend(element);
};

initialCards.forEach((data) => {
  renderCard(data, elementsContainer);
});

const addCard = (e) => {
  e.preventDefault();
  const card = {
    name: placeInput.value,
    link: linkInput.value,
    alt: placeInput.value,
  };

  placeInput.value = '';
  linkInput.value = '';

  renderCard(card, elementsContainer);
  closePopup(popupPlaceElement);
};

popupPlaceForm.addEventListener('submit', addCard);
