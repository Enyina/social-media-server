const { Schema, model } = require("mongoose");

const identitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});
const Identity = model("Identity", identitySchema);

module.exports = Identity;
