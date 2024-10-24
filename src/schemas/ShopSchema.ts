import Joi from "joi";

const ShopSchema = Joi.object({
  userId: Joi.string().required(),
  shopName: Joi.string().required(),
  shopPicture: Joi.string().required(),
});

export default ShopSchema;
