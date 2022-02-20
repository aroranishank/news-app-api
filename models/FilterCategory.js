const mongoose = require("mongoose");

const FilterCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    parentCategory: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  { collection: "filter-categories" }
);

const filterCategory = mongoose.model("FilterCategory", FilterCategorySchema);

exports.FilterCategory = filterCategory;
