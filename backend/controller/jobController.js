const Job = require("../models/job");
const Company = require("../models/company");

const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Job Created Successfully",
      job,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json(jobs);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Job Updated Successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can delete only your own jobs",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  updateJob,
  deleteJob
};