import Joi from "joi";

const userValidation = (body) => {
  const UserValidationSignUp = Joi.object({
    lastname: Joi.string().min(1).max(50).trim().required(),
    firstname: Joi.string().min(1).max(50).trim().required(),
    mail: Joi.string().min(1).max(100).trim().required(),
    password: Joi.string().min(8).max(20).trim().required()
  });

  const UserValidationLogin = Joi.object({
    mail: Joi.string().min(1).max(100).trim().required(),
    password: Joi.string().min(8).max(20).trim().required()
  });

  return {
    UserValidationSignUp : UserValidationSignUp.validate(body),
    UserValidationLogin : UserValidationLogin.validate(body)
  }
};

export default userValidation;
