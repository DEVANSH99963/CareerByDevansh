const Application = require("../models/Application");

const applyJob = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const existingApplication = await Application.findOne({
      user: req.body.userId,
      job: req.body.jobId,
    });
    console.log("EXISTING:", existingApplication);

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      user: req.body.userId,
      job: req.body.jobId,
    });

    res.status(201).json({
      message: "Applied Successfully",
      application,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.id,
    }).populate("job");

    res.status(200).json(applications);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  applyJob,
  getApplications,
};