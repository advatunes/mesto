export class UserInfo {
  constructor({ profileName, profileJob, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserid() {
    return this._id;
  }

  getUserInfo() {
    const userInfoFields = {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
    return userInfoFields;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = about;
    this._profileAvatar.src = avatar;
    this._id = _id;
  }
}
