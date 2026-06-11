const express = require("express");
const router = express.Router();

const {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
} = require("../controller/companyController");

router.post("/", createCompany);
router.get("/", getCompanies);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

module.exports = router;