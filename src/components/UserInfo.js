import { profileName } from '../utils/constants.js';
import { profileJob } from '../utils/constants.js';

export class UserInfo {
    constructor({ profileName, profileJob }) {
      this._profileName = profileName;
      this._profileJob = profileJob;
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
      profileJob.textContent = data.job;
    }
  }