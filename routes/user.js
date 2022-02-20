const winston = require("winston");
const userController = require("../controllers/UserController")
const common = require("../common/Common")
const yup = require("yup");
const express = require("express");
const router = express.Router();

/**
 * API for fetching user profile data
 */
router.get("/profile", async (req, res, next) => {
    try {
        await userController.validateUserProfileRequest(req.query);
    } catch (err) {
        const responseData = common.prepareResponse(false, err.errors, err.message)
        res.status(400).send(responseData)
        return
    }

    try {
        // Find user profile data
        const userData = await userController.getUserProfile(req.query.email);
        const responseData = common.prepareResponse(true, userData, "")
        res.status(200).send(responseData);
    } catch (error) {
        const responseData = common.prepareResponse(false, {}, err.message);
        // Exception handling
        res.status(500).send(responseData);
        winston.error(error.message);
    }
});

/**
 * API for saving user profile data
 */
router.post("/save-profile", async (req, res, next) => {
  try {
    await userController.validateSaveProfileRequest(req.body);
  } catch (err) {
    const responseData = common.prepareResponse(false, err.errors, err.message);
    res.status(400).send(responseData);
    return;
  }

  try {
    // save user profile data
    const userData = await userController.saveUserProfile(req.body);
    const responseData = common.prepareResponse(true, userData, "");
    res.status(200).send(responseData);
  } catch (error) {
    const responseData = common.prepareResponse(false, {}, err.message);
    // Exception handling
    res.status(500).send(responseData);
    winston.error(error.message);
  }
});

module.exports = router;