import { profileName } from '../utils/constants.js';
import { profileJob } from '../utils/constants.js';
import { popupAvatarImg } from '../utils/constants.js';

export class UserInfo {
  constructor({ profileName, profileJob }) {
    this._profileName = profileName;
    this._profileJob = profileJob;
  }

  get id() {
    return this._id;
  }

  set id(data) {
    this._id = data;
  }

  getUserInfo() {
    const userInfoFields = {
      profileName: this._profileName.textContent,
      profileJob: this._profileJob.textContent,
    };
    return userInfoFields;
  }

  setUserInfo(data) {
    profileName.textContent = data.name;
    profileJob.textContent = data.about;
  }

  setUserAvatar(data) {
    popupAvatarImg.src = data;
  }
}
