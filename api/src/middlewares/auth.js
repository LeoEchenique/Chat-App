const { isTokenValid } = require("../utils/jwt");

const authenticateReq = async (req, res, next) => {
  //console.log("hi auth|||");
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("No hay un token presente");
    }
    const token = authHeader.split(" ")[1];
    const payloadDecoded = isTokenValid(token); // it's always gonna be the id of the user

    req.user = { id: payloadDecoded.token, expires: payloadDecoded.iat };
    next();
  } catch (err) {
    next(err.message);
  }
};

module.exports = {
  authenticateReq,
};
