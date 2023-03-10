const JWTservice = {
  makeTokens: (id, lifeSpan) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: lifeSpan });
  },
  generateToken: (id) => {
    const accessToken = JWTservice.makeTokens(id, "600s"); // expires in 10 minutes
    const refreshToken = JWTservice.makeTokens(id, "5400s"); // expires in 3 months
    return { accessToken, refreshToken };
  },
};
module.exports = JWTservice;
