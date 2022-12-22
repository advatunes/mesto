class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    // Вызов попапа увеличения картинки
    this._element.querySelector('.element__image').addEventListener('click', () => {
      openPopup(popupImageElement);
      popupImageTitle.textContent = this._name;
      popupImagePic.src = this._link;
      popupImagePic.alt = this._name;
    });

    this._handleLikeButton();
    this._handleDeleteButton();
  }

  // Удаление карточки
  _handleDeleteButton = () => {
    const deleteButton = this._element.querySelector('.element__trash-icon');
    deleteButton.addEventListener('click', (e) => {
      e.target.closest('.element').remove();
    });
  };

  // Лайки
  _handleLikeButton = () => {
    const likeButton = this._element.querySelector('.element__like');
    likeButton.addEventListener('click', (e) => {
      e.target.classList.toggle('element__like_active');
    });
  };
}

export { Card };
