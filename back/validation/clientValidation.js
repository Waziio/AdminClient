import Joi from "joi";

const clientValidation = (body) => {
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
  if (body?.lastname) body.lastname = body.lastname.toUpperCase();
  if (body?.city) body.city = body.city.toUpperCase();

  const ClientSchema = Joi.object({
    lastname: Joi.string().min(1).max(50).uppercase({ force: true }).trim().required(),
    firstname: Joi.string().min(1).max(50).trim().required(),
    date: Joi.date().iso().max(eighteenYearsAgo).required(),
    mail: Joi.string().min(1).max(100).email().trim().required(),
    address: Joi.string().min(1).max(100).trim().required(),
    postalcode: Joi.string().min(1).max(10).trim().required(),
    city: Joi.string().min(1).max(50).uppercase().trim().required(),
    country: Joi.string().min(1).max(50).trim().required(),
    profile_picture: Joi.string().trim().base64(),
  });

  const ClientValidationUpdate = Joi.object({
    lastname: Joi.string().min(1).max(50).uppercase({ force: true }).trim(),
    firstname: Joi.string().min(1).max(50).trim(),
    date: Joi.date().iso().max(eighteenYearsAgo),
    mail: Joi.string().min(1).max(100).email().trim(),
    address: Joi.string().min(1).max(100).trim(),
    postalcode: Joi.string().min(1).max(10).trim(),
    city: Joi.string().min(1).max(50).uppercase().trim(),
    country: Joi.string().min(1).max(50).trim(),
    profile_picture: Joi.string().trim().base64(),
  });

  return {
    ClientValidationCreate: ClientSchema.validate(body, { convert: true }),
    ClientValidationUpdate: ClientValidationUpdate.validate(body, { convert: true }),
  };
};

export default clientValidation;
