const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const AppError = require("./utils/appError");
const errorHandler = require("./middleware/errorHandler");
const v1Router = require("./router");
const { stream } = require("./config/winston");
const cors = require("cors");
const fileupload = require("express-fileupload");

const cookieParser = require("cookie-parser");
const { cloudinary } = require("./utils/cloudinary");

const app = express();
// TODO: confirm this
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//middleware
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(helmet());
app.use(morgan("combined", { stream }));
app.use(cors());
app.use(fileupload({ useTempFiles: true }));

app.get("/health", (_request, response) => {
  response.json({ status: "up" });
});

// app.get("/api/images", async (req, res) => {
//   const { resources } = await cloudinary.search
//     .expression("folder: mosocial")
//     .sort_by("public_id", "desc")
//     // .max_results(30)
//     .execute();

//   const publicIds = resources.map((file) => file.public_id);
//   res.json({ publicIds });
// });

app.post("/api/upload", async (req, res) => {
  try {
    const fileStr = req.body.fileName;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "mosocial",
    });
    res.status(201).json({ status: "success", uploadResponse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

app.use("/api/v1", v1Router);

app.all("*", (_req, _res, next) => {
  next(new AppError("Route not Found!", 404));
});

app.use(errorHandler);

module.exports = app;
