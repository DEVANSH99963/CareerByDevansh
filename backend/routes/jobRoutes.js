const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} = require("../controller/jobController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, createJob);
router.get("/", getJobs); // ye rehne do
router.put("/:id", auth, updateJob);
router.delete("/:id", auth, deleteJob);

module.exports = router;