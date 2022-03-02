import { User, UserInfo } from './../user/models/User.js';

// returns the user data without the password hash
export const getUserInfo = (user: User): UserInfo => {
  const userInfo: UserInfo = {
    _id: user._id,
    userName: user.userName,
    isAdmin: user.isAdmin,
    creationDate: user.creationDate,
  };
  return userInfo;
}
