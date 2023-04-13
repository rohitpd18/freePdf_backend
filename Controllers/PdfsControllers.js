const Pdf = require("../models/PdfModel");
const fs = require("fs");
const pdfCounter = require("pdf-page-counter");

exports.getAllPdfs = async (req, res) => {
  try {
    const data = await Pdf.find();

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({ mas: "some server error" });
  }
};

exports.getPdf = async (req, res) => {
  try {
    const data = await Pdf.findOne({_id: req.params.id});

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({ mas: "some server error" });
  }
};



// addPdfs
exports.addPdf = async (req, res) => {
  try {
    const newPdf = req.body;
    const pdf = new Pdf({
      name: req.body.name,
      description: req.body.description,
      tag: req.body.tag,
      uploadedBy: req.body.uploadedBy,
      category: req.body.category,
      publishDate: req.body.publishDate,
      subtitle: req.body.subtitle,
    });

    if (req.files) {
      pdf.pdfUrl = req.files.pdfUrl[0].path;
      pdf.img = req.files.img[0].path;
      pdf.pdfSize = (Math.round(req.files.img[0].size) / 1024).toFixed(2).toString();

      let dataBuffer = fs.readFileSync(req.files.pdfUrl[0].path);
      let noOfPage= await pdfCounter(dataBuffer)
      pdf.noOfPage=noOfPage.numpages
    }

    pdf.save();
    res.status(201).json(pdf);
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ mass: "Server Error" });
  }
};

// update Alumni
exports.updatePdf = async (req, res) => {
  try {
    const newdata = req.body;
    const pdf = await Pdf.updateOne({ _id: req.params.id }, newdata);
    res.status(204).json(pdf);
  } catch (err) {
    res.status(500).json({ mas: "some server error" });
  }
};

// delete Alumni
exports.deletePdf = async (req, res) => {
  try {
    const temp = await Pdf.findOne({ _id: req.params.id });
    fs.unlinkSync(temp.pdfUrl)
    fs.unlinkSync(temp.img)
    const pdf = await Pdf.deleteOne({ _id: req.params.id });
    res.status(202).json(pdf);
  } catch (err) {
    res.status(500).json({ mas: "some server error" });
  }
};
