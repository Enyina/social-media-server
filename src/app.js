const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const AppError = require("./utils/appError");
const errorHandler = require("./middleware/errorHandler");

const app = express();
// TODO: confirm this
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("combined", { stream }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

app.get("/health", (_request, response) => {
  response.json({ status: "up" });
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/v1", v1Route);

app.all("*", (_req, _res, next) => {
  next(new AppError("Route not Found!", 404));
});

app.use(errorHandler);

module.exports = app;
