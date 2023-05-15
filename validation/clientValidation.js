import Joi from "joi";

const clientValidation = (body) => {
  const ClientSchema = Joi.object({
    lastname: Joi.string().min(1).max(50).trim().required(),
    firstname: Joi.string().min(1).max(50).trim().required(),
    date: Joi.date().iso().max("now").required(),
    mail: Joi.string().min(1).max(100).trim().required(),
    address: Joi.string().min(1).max(100).trim().required(),
    postalcode: Joi.string().min(1).max(10).trim().required(),
    city: Joi.string().min(1).max(50).uppercase().trim().required(),
    country: Joi.string().min(1).max(50).trim().required(),
  });

  return ClientSchema.validate(body);
};

export default clientValidation;
