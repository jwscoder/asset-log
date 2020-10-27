const mongoose = require("mongoose");

const db = "mongodb://localhost:27017/assetDB";

//ASSET SCHEMA
const assetSchema = {
  type: String,
  model: String,
  number: Number,
  location: String
}

//ASSET MODEL CREATION
const Asset = mongoose.model("Asset", assetSchema);

module.exports.Asset = Asset;

module.exports.db = db;
