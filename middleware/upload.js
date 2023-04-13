const path = require("path");
const multer = require("multer");

let stroage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now()+ ext);
  },
});

let upload = multer({
  storage: stroage,
});

let multiUpload = upload.fields([{ name: "pdfUrl" }, { name: "img" }]);

module.exports = multiUpload;
