export class Card {
  constructor(
    { data, handleCardClick, handleLikeClick, handleDeleteIconClick, userData },
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
    this._userId = userData._id;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__like-counter').textContent = this._likes.length;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    return this._element;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  updateCount(res) {
    this._element.querySelector('.element__like-counter').textContent = res.likes.length;
    this._likes = res.likes;
  }

  hideDeleteButton() {
    if (this._ownerId !== this._userId) {
      this._element.querySelector('.element__trash-icon').remove();
    }
  }

  deleteCard() {
    this._element.remove();
  }

  addLikeOnLoadCard() {
    if (this.isLiked()) {
      this._element.querySelector('.element__like-btn').classList.add('element__like-btn_active');
    }
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._element.querySelector('.element__like-btn').addEventListener('click', (e) => {
      this._handleLikeClick(this._cardId);
      e.target.classList.toggle('element__like-btn_active');
    });

    this._element.querySelector('.element__trash-icon').addEventListener('click', () => {
      this._handleDeleteIconClick(this._cardId);
    });
  }
}
