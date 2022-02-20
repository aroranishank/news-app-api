const yup = require("yup");
const { feedObj } = require("../models/Feed")

/**
 * Method to get search results based on filters provided in request
 * 
 * @param {*} reqData object
 * @returns array
 */
async function getSearchResult(reqData)
{
    const filterReq = reqData["filters"] ? reqData["filters"] : {}
    const page = reqData["page"] ? Number(reqData["page"]) : 1
    const limit = reqData["limit"] ? Number(reqData["limit"]) : 10
    const sort = reqData["sort"] ? reqData["sort"] : null;
    const skip = (page - 1) * limit
    const queryObj = {}
    let sortObj = {}

    if(Object.keys(filterReq).length > 0) {
        const filters = Object.keys(filterReq);
        queryObj["category.parentCategory"] = { "$in": filters }
        queryObj["category.isActive"] = true

        let categories = []
        filters.forEach((item) => {
          categories.push(filterReq[item]);
        });
        categories = [...new Set(categories)];

        queryObj["category"] = { "$in": categories }
    }

    if(sort != null) {
        sortObj[sort] = 1
    }

    if(Object.keys(sortObj).length > 0) {
        return await feedObj.find(queryObj).sort(sortObj).skip(skip).limit(limit)
    }

    return await feedObj.find(queryObj).skip(skip).limit(limit);
}

/**
 * Method to validate request
 * 
 * @param {*} inputRequest object
 */
async function validateSearchRequest(inputRequest) {
  const schema = yup.object({
    filters: yup.object(),
    page: yup.number(),
    limit: yup.number(),
    sort: yup.string()
  });

  await schema.validate(inputRequest, { strict: true });
}

module.exports = { getSearchResult, validateSearchRequest }