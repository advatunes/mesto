let popupElement = document.querySelector(".popup"),
  popupOpenButton = document.querySelector(".profile__edit-button"),
  popupCloseButton = popupElement.querySelector(".popup__close-icon"),
  nameInput = popupElement.querySelector(".popup__name"),
  jobInput = popupElement.querySelector(".popup__job"),
  popupSaveButton = popupElement.querySelector(".popup__submit"),
  profileName = document.querySelector(".profile__name"),
  profileJob = document.querySelector(".profile__job");

function popupOpen() {
  popupElement.classList.add('popup_opened');
}

function popupClose() {
  popupElement.classList.remove('popup_opened');
}

popupOpenButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;


popupSaveButton.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
});


