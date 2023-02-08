export const popupNameElement = document.querySelector('.popup-name'),
popupNameForm = popupNameElement.querySelector('.popup__form'),
popupNameOpenButton = document.querySelector('.profile__edit-button'),
nameInput = popupNameElement.querySelector('.popup-name__input-name'),
jobInput = popupNameElement.querySelector('.popup-name__input-job'),
profileName = document.querySelector('.profile__name'),
profileJob = document.querySelector('.profile__job'),

popupPlaceElement = document.querySelector('.popup-place'),
popupPlaceForm = popupPlaceElement.querySelector('.popup__form'),
popupPlaceOpenButton = document.querySelector('.profile__add-button'),
elementsContainer = '.elements',

popupAvatarElement = document.querySelector('.popup-avatar'),
popupAvatarForm = popupAvatarElement.querySelector('.popup__form'),
popupAvatarImg = document.querySelector('.profile__avatar'),

popupWithSubmitElement = document.querySelector('.popup-withSubmit'),

popupImageElement = document.querySelector('.popup-image');


// объект настроек
export const config = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  };