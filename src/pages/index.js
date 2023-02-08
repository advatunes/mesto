import '../pages/index.css';

import { Api } from '../components/api.js';
import { config } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';
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
  popupAvatarElement,
  popupAvatarForm,
  popupAvatarImg,
  popupWithSubmitElement,
  popupImageElement
} from '../utils/constants.js';

const formValidatorPopupAvatar = new FormValidator(config, popupAvatarForm);
const formValidatorPopupName = new FormValidator(config, popupNameForm);
const formValidatorPopupPlace = new FormValidator(config, popupPlaceForm);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'c38dba9b-9ace-44e9-88d0-045d1a581493',
    'Content-Type': 'application/json',
  },
});

Promise.all([api.getInitialCards(), api.getUserData()])
  .then((value) => {
    const [getInitialCards, getUserData] = value;
    userData.setUserInfo({
      name: getUserData.name,
      about: getUserData.about,
    });
    userData.id = getUserData._id;
    userData.setUserAvatar(getUserData.avatar);

    cardList.renderItems(getInitialCards);
  })
  .catch((err) => {
    console.log(err);
  });

const cardList = new Section(
  {
    renderer: (item) => {
      renderCard(item);
      addCard(renderCard(item));
    },
  },

  elementsContainer
);

const renderCard = (data) => {
  const card = new Card(
    { data, handleCardClick, handleLikeClick, handleDeleteIconClick, userData },
    '#element-template'
  );

  function handleCardClick(name, link) {
    popupImage.open(name, link);
  }

  function handleLikeClick(obj) {
    if (card.isLiked()) {
      api
        .deleteLike(obj)
        .then((res) => {
          card.updateCount(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .addLike(obj)
        .then((res) => {
          card.updateCount(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleDeleteIconClick(cardId) {
    const popupWithSubmit = new PopupWithSubmit(popupWithSubmitElement, {
      handleSubmit: () => {
        api
          .deleteCard(cardId)
          .then(() => {
            card.deleteCard();
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
    popupWithSubmit.setEventListeners();
    popupWithSubmit.open();
  }

  const cardElement = card.generateCard();

  card.addLikeOnLoadCard();
  card.hideDeleteButton();
  return cardElement;
};

const addCard = (card) => {
  cardList.addItem(card);
};

const userData = new UserInfo({ profileName, profileJob });

const popupImage = new PopupWithImage(popupImageElement);
popupImage.setEventListeners();

const popupName = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      popupName.preload(true);
      api
        .editUserData({
          about: data.job,
          name: data.name,
        })
        .then((res) => {
          userData.setUserInfo(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupName.preload(false);
        });
    },
  },
  popupNameElement
);

popupName.setEventListeners();

popupNameOpenButton.addEventListener('click', () => {
  popupName.open();
  nameInput.value = userData.getUserInfo().profileName;
  jobInput.value = userData.getUserInfo().profileJob;
  formValidatorPopupName.clearValidation();
});

const popupPlace = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      api
        .addNewCard({
          name: data.place,
          link: data.link,
        })
        .then((res) => {
          renderCard(res);
          addCard(renderCard(res));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  popupPlaceElement
);

popupPlace.setEventListeners();

popupPlaceOpenButton.addEventListener('click', () => {
  popupPlace.open();
  formValidatorPopupPlace.toggleSubmitBtn();
  formValidatorPopupPlace.clearValidation();
});

const popupAvatar = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      popupAvatar.preload(true);
      api
        .editAvatar(data)
        .then(() => {
          popupAvatarImg.src = data.avatar;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupAvatar.preload(false);
        });
    },
  },
  popupAvatarElement
);

popupAvatar.setEventListeners();
popupAvatarImg.addEventListener('click', () => {
  popupAvatar.open();
  formValidatorPopupAvatar.toggleSubmitBtn();
  formValidatorPopupAvatar.clearValidation();
});

formValidatorPopupName.enableValidation();
formValidatorPopupPlace.enableValidation();
formValidatorPopupAvatar.enableValidation();



