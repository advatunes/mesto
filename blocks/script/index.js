let popupElement = document.querySelector(".popup"),
  popupForm = popupElement.querySelector(".popup__container"),
  popupOpenButton = document.querySelector(".profile__edit-button"),
  popupCloseButton = popupElement.querySelector(".popup__close-icon"),
  nameInput = popupElement.querySelector(".popup__name"),
  jobInput = popupElement.querySelector(".popup__job"),
  profileName = document.querySelector(".profile__name"),
  profileJob = document.querySelector(".profile__job");

function popupOpen() {
  popupElement.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupClose() {
  popupElement.classList.remove("popup_opened");
}

popupOpenButton.addEventListener("click", popupOpen);
popupCloseButton.addEventListener("click", popupClose);

popupForm.addEventListener("submit", function (evt) {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupElement.classList.remove("popup_opened");
  evt.preventDefault();
});


