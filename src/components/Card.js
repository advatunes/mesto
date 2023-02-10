export class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleDeleteIconClick, userId },
    templateSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._data = data;
    this._ownerId = data.owner._id;
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._element = this._getTemplate();
    this._cardLikeIcon = this._element.querySelector('.element__like-btn');
  }

  getCardId() {
    return this._cardId;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
  }

  generateCard() {
    this._setEventListeners();

    this._element.querySelector('.element__like-counter').textContent = this._likes.length;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    if (this.isLiked()) {
      this._handleLikeButton();
    }

    if (this._ownerId !== this._userId) {
      this._element.querySelector('.element__trash-icon').remove();
    }
    return this._element;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  updateCount(res) {
    this._element.querySelector('.element__like-counter').textContent = res.likes.length;
    this._likes = res.likes;
    this._handleLikeButton();
  }

  _handleLikeButton() {
    this._cardLikeIcon.classList.toggle('element__like-btn_active');
  }

  deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
      console.log(this._cardLikeIcon);
      this._handleLikeButton(this);
    });

    this._cardLikeIcon.addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    this._element.querySelector('.element__trash-icon').addEventListener('click', () => {
      this._handleDeleteIconClick(this);
    });
  }
}
