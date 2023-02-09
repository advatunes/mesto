import { profileName } from '../utils/constants.js';
import { profileJob } from '../utils/constants.js';
import { popupAvatarImg } from '../utils/constants.js';

export class UserInfo {
  constructor({ profileName, profileJob }) {
    this._profileName = profileName;
    this._profileJob = profileJob;
  }

  getUserid() {
    return this._id;
  }

  getUserInfo() {
    const userInfoFields = {
      profileName: this._profileName.textContent,
      profileJob: this._profileJob.textContent,
    };
    return userInfoFields;
  }

  setUserInfo({ name, about, avatar, _id }) {
    profileName.textContent = name;
    profileJob.textContent = about;
    popupAvatarImg.src = avatar;
    this._id = _id;
  }
}
