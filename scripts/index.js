let popupElement = document.querySelector('.popup'),
  popupForm = popupElement.querySelector('.popup__form'),
  popupOpenButton = document.querySelector('.profile__edit-button'),
  popupCloseButton = popupElement.querySelector('.popup__close-icon'),
  nameInput = popupElement.querySelector('.popup__input_field_name'),
  jobInput = popupElement.querySelector('.popup__input_field_job'),
  profileName = document.querySelector('.profile__name'),
  profileJob = document.querySelector('.profile__job');

// Открытие попапа
function openPopup() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Закрытие попапа
function closePopup() {
  popupElement.classList.remove('popup_opened');
}

// Копирование текстовых полей попапа в профиль
function editProfileValue(evt) {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
  evt.preventDefault();
}

popupForm.addEventListener('submit', editProfileValue);
popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
