const Company = require("../models/company");

const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);

    res.status(201).json({
      message: "Company Created Successfully",
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    res.status(200).json(companies);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Company Updated Successfully",
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Company Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
};