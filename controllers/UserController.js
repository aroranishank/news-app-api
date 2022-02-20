const yup = require("yup")
const { userObj } = require("../models/User")
const cryptoObj = require("crypto");
const algorithm = "aes256"; 
const key = "password";
// Defining iv
const iv = cryptoObj.randomBytes(16);

/**
 * Method to create encrypted password
 * 
 * @param {*} text string
 * @returns string
 */
function encryptPass(password)
{
  const cipher = cryptoObj.createCipheriv(algorithm, key, iv)
  return cipher.update(password, "utf8", "hex") + cipher.final("hex");
}

/**
 * Method to decrypt encrypted password
 * 
 * @param {*} encryptedPass string
 * @returns string
 */
function decryptPass(encryptedPass)
{
  const decipher = cryptoObj.createDecipheriv(algorithm, key, iv);
  return decipher.update(encryptedPass, "hex", "utf8") + decipher.final("utf8");
}

/**
 * Method to get user profile data
 * 
 * @param {*} email string 
 * @returns object 
 */
async function getUserProfile(email)
{
    const userData = await userObj.findOne({"email": email})
    const newObj = userData != null ? { ...userData } : null
    if (newObj != null) {
      newObj["password"] = decryptPass(userData["password"]);
    }
    
    return newObj != null ? newObj : {};
}

/**
 * Method to save user profile data
 * 
 * @param {*} reqData object
 */
async function saveUserProfile(reqData)
{
    const queryObj = {
      profilePicture: reqData["profilePicture"],
      username: reqData["username"],
      email: reqData["email"],
      password: encryptPass(reqData["password"]),
      phoneNumber: reqData["phoneNumber"],
      gender: reqData["gender"],
      language: reqData["language"],
      maritalStatus: reqData["maritalStatus"],
      dob: reqData["dob"],
      tob: reqData["tob"],
      isTobAm: reqData["isTobAm"],
      acceptedTc: reqData["acceptedTc"]
    };

    const newUser = new userObj(queryObj)
    return await newUser.save()
}

/**
 * Method to validate save profile request
 * 
 * @param {*} inputRequest object
 */
async function validateSaveProfileRequest(inputRequest) {
    const schema = yup.object({
      profilePicture: yup.string().required(),
      username: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(8),
      phoneNumber: yup.string().required(),
      gender: yup.string().required(),
      language: yup.string().required(),
      maritalStatus: yup.string().required(),
      dobDate: yup
        .string()
        .required()
        .length(2)
        .matches(/^([0-2][0-9]|(3)[0-1])/i),
      dobMonth: yup
        .string()
        .required()
        .length(2)
        .matches(/^(0)[0-9]|(1)[0-2]/i),
      dobYear: yup.string().required().length(4).matches(/^\d{4}$/i),
      tob: yup.string().required().matches(/^((0)[0-9]|(1)[0-1])(:)[0-5][0-9]/i),
      isTobAm: yup.boolean().required(),
      acceptedTc: yup.boolean().required(),
      isActive: yup.boolean(),
      isDeleted: yup.boolean(),
    });

    await schema.validate(inputRequest, { strict: true });
}

/**
 * Method to validate request
 * 
 * @param {*} inputRequest object
 */
async function validateUserProfileRequest(inputRequest) {
    const schema = yup.object({
        email: yup.email().required()
    })

    await schema.validate(inputRequest, {strict: true})
}

module.exports = {
  validateUserProfileRequest,
  validateSaveProfileRequest,
  saveUserProfile,
  getUserProfile
};