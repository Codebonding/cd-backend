import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 3 characters long.",
    "string.max": "Name must be at most 50 characters long.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Email must be a valid email address.",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Phone is required.",
      "string.pattern.base": "Phone must be a valid 10-digit number.",
    }),
  department: Joi.string().optional().max(100).messages({
    "string.max": "Department must be at most 100 characters long.",
  }),
  degree: Joi.string().optional().max(100).messages({
    "string.max": "Degree must be at most 100 characters long.",
  }),
  passedOutYear: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .optional()
    .messages({
      "number.base": "Passed out year must be a number.",
      "number.min": "Passed out year cannot be earlier than 1900.",
      "number.max": `Passed out year cannot be later than ${new Date().getFullYear()}.`,
    }),
  address: Joi.string().optional().max(255).messages({
    "string.max": "Address must be at most 255 characters long.",
  }),
  district: Joi.string().optional().max(100).messages({
    "string.max": "District must be at most 100 characters long.",
  }),
  state: Joi.string().optional().max(100).messages({
    "string.max": "State must be at most 100 characters long.",
  }),
  pinCode: Joi.string()
    .pattern(/^[0-9]{6}$/)
    .optional()
    .messages({
      "string.pattern.base": "Pin code must be a valid 6-digit number.",
    }),
});
