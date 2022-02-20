const mongoose = require("mongoose");

const FeedSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    thumbnailImage: { type: String, required: true },
    headline: { type: String, required: true },
    category: {
      name: { type: String, required: true },
      isActive: { type: Boolean, required: true },
      parentCategory: { type: String, required: true },
    },
    author: { type: String, required: true },
    uploadDate: {
      type: Date,
      required: true,
      default: () => {
        return new Date();
      },
    },
    isActive: { type: Boolean, required: true, default: true },
  },
  { collection: "feeds" }
);

const Feed = mongoose.model("Feed", FeedSchema);

exports.Feed = Feed;
