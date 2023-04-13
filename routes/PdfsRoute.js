const express = require("express");
const multiUpload = require('../middleware/upload')
const router = express.Router();

const {getAllPdfs, getPdf, addPdf, updatePdf, deletePdf}= require('../Controllers/PdfsControllers')

router.route("/").get(getAllPdfs);
router.route("/:id").get(getPdf);
router.route("/").post(multiUpload, addPdf);
router.route("/:id").put(updatePdf);
router.route("/:id").delete(deletePdf);


module.exports = router;
