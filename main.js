(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,n(o.key),o)}}function n(t){var n=function(t,n){if("object"!==e(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,"string");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===e(n)?n:String(n)}var r=function(){function e(t){var r,o,i,u=t.baseUrl,a=t.headers;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=this,i=void 0,(o=n(o="_"))in r?Object.defineProperty(r,o,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[o]=i,this._baseUrl=u,this._headers=a}var r,o;return r=e,(o=[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"_request",value:function(e,t){return fetch(e,t).then(this._checkResponse)}},{key:"getInitialCards",value:function(){return this._request("".concat(this._baseUrl,"/cards"),{headers:this._headers})}},{key:"getUserData",value:function(){return this._request("".concat(this._baseUrl,"/users/me"),{headers:this._headers})}},{key:"editUserData",value:function(e){return this._request("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e.name,about:e.about})})}},{key:"editAvatar",value:function(e){return this._request("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify(e)})}},{key:"addNewCard",value:function(e){return this._request("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e.name,link:e.link})})}},{key:"addLike",value:function(e){return this._request("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers})}},{key:"deleteLike",value:function(e){return this._request("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers})}},{key:"deleteCard",value:function(e){return this._request("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers})}}])&&t(r.prototype,o),Object.defineProperty(r,"prototype",{writable:!1}),e}(),o=document.querySelector(".popup-name"),i=o.querySelector(".popup__form"),u=document.querySelector(".profile__edit-button"),a=o.querySelector(".popup-name__input-name"),l=o.querySelector(".popup-name__input-job"),c=document.querySelector(".profile__name"),s=document.querySelector(".profile__job"),f=document.querySelector(".popup-place"),p=f.querySelector(".popup__form"),y=document.querySelector(".profile__add-button"),m=document.querySelector(".popup-avatar"),d=m.querySelector(".popup__form"),b=document.querySelector(".profile__avatar"),h=document.querySelector(".popup-withSubmit"),v=document.querySelector(".popup-image"),_={inputSelector:".popup__input",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function S(e){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(e)}function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==S(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==S(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===S(o)?o:String(o)),r)}var o}var w=function(){function e(t,n){var r=t.data,o=t.handleCardClick,i=t.handleLikeClick,u=t.handleDeleteIconClick,a=t.userId;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._name=r.name,this._link=r.link,this._likes=r.likes,this._data=r,this._ownerId=r.owner._id,this._cardId=r._id,this._templateSelector=n,this._handleCardClick=o,this._userId=a,this._handleLikeClick=i,this._handleDeleteIconClick=u}var t,n;return t=e,(n=[{key:"getCardId",value:function(){return this._cardId}},{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(!0)}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._setEventListeners(),this._element.querySelector(".element__like-counter").textContent=this._likes.length,this._element.querySelector(".element__image").src=this._link,this._element.querySelector(".element__image").alt=this._name,this._element.querySelector(".element__name").textContent=this._name,this._element}},{key:"isLiked",value:function(){var e=this;return this._likes.some((function(t){return t._id===e._userId}))}},{key:"updateCount",value:function(e){this._element.querySelector(".element__like-counter").textContent=e.likes.length,this._likes=e.likes}},{key:"hideDeleteButton",value:function(){this._ownerId!==this._userId&&this._element.querySelector(".element__trash-icon").remove()}},{key:"deleteCard",value:function(){this._element.remove()}},{key:"addLikeOnLoadCard",value:function(){this.isLiked()&&this._element.querySelector(".element__like-btn").classList.add("element__like-btn_active")}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".element__image").addEventListener("click",(function(){e._handleCardClick(e._name,e._link)})),this._element.querySelector(".element__like-btn").addEventListener("click",(function(t){e._handleLikeClick(e),t.target.classList.toggle("element__like-btn_active")})),this._element.querySelector(".element__trash-icon").addEventListener("click",(function(){e._handleDeleteIconClick(e)}))}}])&&g(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function k(e){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},k(e)}function E(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,O(r.key),r)}}function C(e,t,n){return t&&E(e.prototype,t),n&&E(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function j(e,t,n){return(t=O(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function O(e){var t=function(e,t){if("object"!==k(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==k(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===k(t)?t:String(t)}var P=C((function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),j(this,"_hasValidInput",(function(){return r._inputList.every((function(e){return e.validity.valid}))})),j(this,"_checkInputValidity",(function(e){e.validity.valid?r._hideInputError(e):r._showInputError(e,e.validationMessage)})),j(this,"_toggleButtonState",(function(){r._hasValidInput()?r._enableSubmitButton():r._disableSubmitButton()})),j(this,"_enableSubmitButton",(function(){r._buttonElement.classList.remove(r._inactiveButtonClass),r._buttonElement.disabled=""})),j(this,"_disableSubmitButton",(function(){r._buttonElement.classList.add(r._inactiveButtonClass),r._buttonElement.disabled="disabled"})),j(this,"_showInputError",(function(e,t){var n=r._formElement.querySelector("#".concat(e.name,"-error"));n.classList.add(r._errorClass),n.textContent=t,e.classList.add(r._inputErrorClass)})),j(this,"_hideInputError",(function(e){var t=r._formElement.querySelector("#".concat(e.name,"-error"));e.classList.remove(r._inputErrorClass),t.classList.remove(r._errorClass),t.textContent=""})),j(this,"_setEventListeners",(function(){r._toggleButtonState(),r._inputList.forEach((function(e){e.addEventListener("input",(function(){r._checkInputValidity(e),r._toggleButtonState()}))}))})),j(this,"clearValidation",(function(){r._inputList.forEach((function(e){e.classList.contains(r._inputErrorClass)&&r._hideInputError(e)}))})),j(this,"clearFormInput",(function(){r._inputList.forEach((function(e){e.value=""}))})),j(this,"toggleSubmitBtn",(function(){r._toggleButtonState()})),j(this,"enableValidation",(function(){r._setEventListeners()})),this._config=t,this._inputSelector=t.inputSelector,this._inactiveButtonClass=t.inactiveButtonClass,this._inputErrorClass=t.inputErrorClass,this._errorClass=t.errorClass,this._formElement=n,this._buttonElement=this._formElement.querySelector(t.submitButtonSelector),this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector))}));function L(e){return L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},L(e)}function q(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==L(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==L(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===L(o)?o:String(o)),r)}var o}var I=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=t,this.escClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",(function(t){var n=t.target.classList;(n.contains("popup")||n.contains("popup__close-icon"))&&e.close()}))}},{key:"open",value:function(){document.addEventListener("keydown",this.escClose),this._popup.classList.add("popup_opened")}},{key:"close",value:function(){document.removeEventListener("keydown",this.escClose),this._popup.classList.remove("popup_opened")}},{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}}])&&q(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function T(e){return T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},T(e)}function R(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==T(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==T(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===T(o)?o:String(o)),r)}var o}function B(){return B="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=x(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},B.apply(this,arguments)}function x(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=V(e)););return e}function U(e,t){return U=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},U(e,t)}function D(e,t){if(t&&("object"===T(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function V(e){return V=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},V(e)}var A=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&U(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=V(r);if(o){var n=V(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return D(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._submit=t._popup.querySelector(".popup__submit"),t._submitText=t._submit.textContent,t}return t=u,(n=[{key:"setEventListeners",value:function(){var e=this;B(V(u.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(t){t.preventDefault(),e._handleSubmitCallback()}))}},{key:"preload",value:function(e){this._submit.textContent=e?"Удаление..":this._submitText}},{key:"setSubmitAction",value:function(e){this._handleSubmitCallback=e}}])&&R(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(I);function N(e){return N="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},N(e)}function J(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==N(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==N(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===N(o)?o:String(o)),r)}var o}function F(){return F="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=H(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},F.apply(this,arguments)}function H(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=$(e)););return e}function M(e,t){return M=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},M(e,t)}function z(e,t){if(t&&("object"===N(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function $(e){return $=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},$(e)}var G=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&M(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=$(r);if(o){var n=$(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return z(this,e)});function u(e,t){var n,r=e.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._handleFormSubmit=r,n._inputList=n._popup.querySelectorAll(".popup__input"),n._form=n._popup.querySelector(".popup__form"),n._submit=n._popup.querySelector(".popup__submit"),n._submitText=n._submit.textContent,n}return t=u,(n=[{key:"close",value:function(){this._form.reset(),F($(u.prototype),"close",this).call(this)}},{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"preload",value:function(e){this._submit.textContent=e?"Сохранение..":this._submitText}},{key:"setEventListeners",value:function(){var e=this;F($(u.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues())}))}}])&&J(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(I);function K(e){return K="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},K(e)}function Q(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==K(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==K(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===K(o)?o:String(o)),r)}var o}function W(){return W="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=X(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},W.apply(this,arguments)}function X(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=ee(e)););return e}function Y(e,t){return Y=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},Y(e,t)}function Z(e,t){if(t&&("object"===K(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function ee(e){return ee=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},ee(e)}var te=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&Y(e,t)}(u,e);var t,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=ee(r);if(o){var n=ee(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return Z(this,e)});function u(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(t=i.call(this,e))._imagePic=t._popup.querySelector(".popup-image__pic"),t._imageTitle=t._popup.querySelector(".popup-image__title"),t}return t=u,(n=[{key:"open",value:function(e,t){W(ee(u.prototype),"open",this).call(this),this._imageTitle.textContent=e,this._imagePic.src=t,this._imagePic.alt=e}}])&&Q(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(I);function ne(e){return ne="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ne(e)}function re(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==ne(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==ne(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===ne(o)?o:String(o)),r)}var o}var oe=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}}])&&re(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function ie(e){return ie="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ie(e)}function ue(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==ie(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!==ie(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===ie(o)?o:String(o)),r)}var o}var ae=function(){function e(t){var n=t.profileName,r=t.profileJob;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._profileName=n,this._profileJob=r}var t,n;return t=e,(n=[{key:"getUserid",value:function(){return this._id}},{key:"getUserInfo",value:function(){return{profileName:this._profileName.textContent,profileJob:this._profileJob.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.about,r=e.avatar,o=e._id;c.textContent=t,s.textContent=n,b.src=r,this._id=o}}])&&ue(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function le(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var ce=new P(_,d),se=new P(_,i),fe=new P(_,p),pe=new r({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-59",headers:{authorization:"c38dba9b-9ace-44e9-88d0-045d1a581493","Content-Type":"application/json"}}),ye=new ae({profileName:c,profileJob:s});Promise.all([pe.getUserData(),pe.getInitialCards()]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,u,a=[],l=!0,c=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;l=!1}else for(;!(l=(r=i.call(n)).done)&&(a.push(r.value),a.length!==t);l=!0);}catch(e){c=!0,o=e}finally{try{if(!l&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(c)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return le(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?le(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];ye.setUserInfo(o),de.renderItems(i.reverse()),se.enableValidation(),fe.enableValidation(),ce.enableValidation()})).catch((function(e){console.log(e)}));var me=function(e){var t=new w({data:e,handleCardClick:be,handleLikeClick:he,handleDeleteIconClick:_e,userId:ye.getUserid()},"#element-template"),n=t.generateCard();return t.addLikeOnLoadCard(),t.hideDeleteButton(),n},de=new oe({renderer:function(e){me(e),de.addItem(me(e))}},".elements"),be=function(e,t){Se.open(e,t)},he=function(e){e.isLiked()?pe.deleteLike(e.getCardId()).then((function(t){e.updateCount(t)})).catch((function(e){console.log(e)})):pe.addLike(e.getCardId()).then((function(t){e.updateCount(t)})).catch((function(e){console.log(e)}))},ve=new A(h);ve.setEventListeners();var _e=function(e){ve.open(),ve.setSubmitAction((function(){ve.preload(!0),pe.deleteCard(e.getCardId()).then((function(){e.deleteCard(),ve.close()})).catch((function(e){console.log(e)})).finally((function(){ve.preload(!1)}))}))},Se=new te(v);Se.setEventListeners();var ge=new G({handleFormSubmit:function(e){ge.preload(!0),pe.editUserData({about:e.job,name:e.name}).then((function(e){ye.setUserInfo(e),ge.close()})).catch((function(e){console.log(e)})).finally((function(){ge.preload(!1)}))}},o);ge.setEventListeners(),u.addEventListener("click",(function(){ge.open(),a.value=ye.getUserInfo().profileName,l.value=ye.getUserInfo().profileJob,se.clearValidation()}));var we=new G({handleFormSubmit:function(e){we.preload(!0),pe.addNewCard({name:e.place,link:e.link}).then((function(e){de.addItem(me(e)),we.close()})).catch((function(e){console.log(e)})).finally((function(){we.preload(!1)}))}},f);we.setEventListeners(),y.addEventListener("click",(function(){we.open(),fe.toggleSubmitBtn(),fe.clearValidation()}));var ke=new G({handleFormSubmit:function(e){ke.preload(!0),pe.editAvatar(e).then((function(){b.src=e.avatar,ke.close()})).catch((function(e){console.log(e)})).finally((function(){ke.preload(!1)}))}},m);ke.setEventListeners(),b.addEventListener("click",(function(){ke.open(),ce.toggleSubmitBtn(),ce.clearValidation()}))})();