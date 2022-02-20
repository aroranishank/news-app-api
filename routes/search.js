const winston = require("winston");
const searchController = require("../controllers/SearchController");
const common = require("../common/Common");
const yup = require("yup");
const express = require("express");
const router = express.Router();

/**
 * API for fetching feed data based on filters in request
 */
router.get("/feed", async (req, res, next) => {
  try {
    await searchController.validateSearchRequest(req.body);
  } catch (err) {
    const responseData = common.prepareResponse(false, err.errors, err.message);
    res.status(400).send(responseData);
    return;
  }

  try {
    // Find feed data based on filter params
    const feedData = await searchController.getSearchResult(req.body);
    const responseData = common.prepareResponse(true, feedData, "");
    res.status(200).send(responseData);
  } catch (error) {
    const responseData = common.prepareResponse(false, {}, err.message);
    // Exception handling
    res.status(500).send(responseData);
    winston.error(error.message);
  }
});

module.exports = router;