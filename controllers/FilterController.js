const yup = require("yup");
const { FilterCategory } = require("../models/FilterCategory");

/**
 * Method to get filter data
 *
 * @returns array
 */
async function getFilters() {
  const parentCategories = await FilterCategory.distinct('parentCategory');
  const finalFilters = {}
  parentCategories.forEach( async (element) => {
    finalFilters[element] = await FilterCategory.find({
      parentCategory: element,
    });
  });

  return finalFilters;
}

module.exports = {
  getFilters
};
