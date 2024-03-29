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
  popupNameOpenButton,
  popupPlaceElement,
  popupPlaceOpenButton,
  elementsContainer,
  popupAvatarElement,
  popupAvatarImg,
  popupWithSubmitElement,
  popupImageElement,
} from '../utils/constants.js';

const formValidators = {};
const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(config);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'c38dba9b-9ace-44e9-88d0-045d1a581493',
    'Content-Type': 'application/json',
  },
});

const userData = new UserInfo({
  profileName: '.profile__name',
  profileJob: '.profile__job',
  profileAvatar: '.profile__avatar',
});

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([getUserData, getInitialCards]) => {
    userData.setUserInfo(getUserData);
    cardList.renderItems(getInitialCards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

const renderCard = (data) => {
  const card = new Card(
    { data, handleCardClick, handleLikeClick, handleDeleteIconClick, userId: userData.getUserid() },
    '#element-template'
  );

  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(renderCard(item));
    },
  },

  elementsContainer
);

const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};

const handleLikeClick = (card) => {
  if (card.isLiked()) {
    api
      .deleteLike(card.getCardId())
      .then((res) => {
        card.updateCount(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .addLike(card.getCardId())
      .then((res) => {
        card.updateCount(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const popupWithSubmit = new PopupWithSubmit(popupWithSubmitElement);
popupWithSubmit.setEventListeners();

const handleDeleteIconClick = (card) => {
  popupWithSubmit.open();
  popupWithSubmit.setSubmitAction(() => {
    popupWithSubmit.preload(true);
    api
      .deleteCard(card.getCardId())
      .then(() => {
        card.deleteCard();
        popupWithSubmit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithSubmit.preload(false);
      });
  });
};

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
          popupName.close();
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
  popupName.setInputValues(userData.getUserInfo());
  formValidators['popup-name'].clearValidation();
  popupName.open();
});

const popupPlace = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      popupPlace.preload(true);
      api
        .addNewCard({
          name: data.place,
          link: data.link,
        })
        .then((res) => {
          cardList.addItem(renderCard(res));
          popupPlace.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          popupPlace.preload(false);
        });
    },
  },
  popupPlaceElement
);

popupPlace.setEventListeners();

popupPlaceOpenButton.addEventListener('click', () => {
  formValidators['popup-place'].clearValidation();
  popupPlace.open();
});

const popupAvatar = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      popupAvatar.preload(true);
      api
        .editAvatar(data)
        .then((res) => {
          userData.setUserInfo(res);
          popupAvatar.close();
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
  formValidators['popup-avatar'].clearValidation();
  popupAvatar.open();
});
