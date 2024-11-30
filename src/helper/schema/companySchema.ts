import Joi from 'joi';

export const companyValidationSchema = {
  create: Joi.object({
    companyName: Joi.string().max(255).required(),
    companyApplyLink: Joi.string().uri().required(),
    companyLogo: Joi.string().uri().optional(),
  }),

  update: Joi.object({
    companyName: Joi.string().max(255).optional(),
    companyApplyLink: Joi.string().uri().optional(),
    companyLogo: Joi.string().uri().optional(),
  }),
};
