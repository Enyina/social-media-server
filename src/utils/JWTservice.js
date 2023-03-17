const jwt = require("jsonwebtoken");
const JWTHelpers = {
  makeTokens: (id, lifeSpan) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: lifeSpan });
  },
  generateToken: (id) => {
    const accessToken = JWTHelpers.makeTokens(id, "600s"); // expires in 10 minutes
    const refreshToken = JWTHelpers.makeTokens(id, "5400s"); // expires in 3 months
    return { accessToken, refreshToken };
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
