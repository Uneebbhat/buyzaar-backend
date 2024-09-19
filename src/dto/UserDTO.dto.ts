import User from "../models/User.model";

class UserDTO {
  _id: string | unknown;
  name: string;
  email: string;
  profilePic: string;
  role: string;
  constructor(user: User) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.profilePic = user.profilePic;
    this.role = user.role;
  }
}

export default UserDTO;
