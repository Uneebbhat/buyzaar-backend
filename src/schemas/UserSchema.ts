import Joi from "joi";

const UserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  profilePic: Joi.string().uri().optional(),
  role: Joi.string().valid("buyer", "seller").default("buyer"),
  phoneNumber: Joi.string().pattern(/^\d+$/).optional(),
});

export default UserSchema;
