import Joi from "joi";

const UploadProductSchema = Joi.object({
  category: Joi.string().required().messages({
    "string.empty": "Category is required.",
    "any.required": "Category is a mandatory field.",
  }),

  subcategory: Joi.string().required().messages({
    "string.empty": "Subcategory is required.",
    "any.required": "Subcategory is a mandatory field.",
  }),

  details: Joi.object().pattern(Joi.string(), Joi.any()).messages({
    "object.base": "Details must be an object.",
  }),
});

export default UploadProductSchema;
