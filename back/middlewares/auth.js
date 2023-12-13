import jwt from "jsonwebtoken";
import { config } from "../config/jwtConfig.js";


export const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if(!authorization) return res.status(401).json({ message: "token_missing" });
  
  const token = authorization.split(" ")[1];

  if (!token) return res.status(401).json({ message: "token_missing" });

  jwt.verify(token, config.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "token_invalid" });
    }
    req.user = user.user;
    next();
  });
};

export const generateAccessToken = (user) => {
  const sign = {
    id: user.id,
    lastname: user.lastname,
    firstname: user.firstname,
    mail: user.mail,
  }
  return jwt.sign({ user: sign }, config.SECRET_KEY, { expiresIn: "1h" });
};


export const generateRenewToken = (user) => {
  const sign = {
    id: user.id,
    lastname: user.lastname,
    firstname: user.firstname,
    mail: user.mail,
  }
  return jwt.sign({ user: sign }, config.RENEW_SECRET_KEY, { expiresIn: "1d" });
};
