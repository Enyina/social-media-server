const jwt = require("jsonwebtoken");
const JWTHelpers = {
  makeTokens: (id, lifeSpan) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: lifeSpan });
  },
  generateToken: (id) => {
    try {
      const accessToken = JWTHelpers.makeTokens(id, "1h"); // expires in 1 hour
      const refreshToken = JWTHelpers.makeTokens(id, "90d"); // expires in 3 months

      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
    }
  },
  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return { payload: decoded, expired: false };
    } catch (error) {
      return { payload: null, expired: error.message.includes("jwt expired") };
    }
  },
};
module.exports = JWTHelpers;
