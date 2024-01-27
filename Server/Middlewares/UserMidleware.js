const JWT = require("jsonwebtoken");
const userModel = require("../Model/User");

const requireSingn = (req, res, next) => {
  // try {
  //   const decode = JWT.verify(
  //     req.headers.authorization,
  //     process.env.JWT_SECRET
  //   );
  //   req.user = decode;
  //   next();
  // } catch (error) {
  //   console.log(error);
  // }
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token de autorización ausente" });
    }

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token de autorización inválido" });
  }
};
module.exports = {
  requireSingn,
};
