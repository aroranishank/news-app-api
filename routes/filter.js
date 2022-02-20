const winston = require("winston");
const filterController = require("../controllers/FilterController");
const common = require("../common/Common");
const yup = require("yup");
const express = require("express");
const router = express.Router();

/**
 * API for fetching filter data
 */
router.get("/filters", async (req, res, next) => {
  try {
    // Fetch filter data
    const filterData = await filterController.getFilters();
    const responseData = common.prepareResponse(true, filterData, "");
    res.status(200).send(responseData);
  } catch (error) {
    const responseData = common.prepareResponse(false, {}, error.message);
    // Exception handling
    res.status(500).send(responseData);
    winston.error(error.message);
  }
});

module.exports = router;