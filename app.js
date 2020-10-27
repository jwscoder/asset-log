const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const _ = require("lodash");
const dbConfig = require("./database/db-config");
const db = dbConfig.db;
const Asset = dbConfig.Asset;
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//CONNECTING DB WITH MONGOOSE
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

//ROOT - GET ROUTE
app.get("/", function(req, res){
  // sets a delay to allow time for db to be updated and displayed on the page
  setTimeout(function(){
    // looks up all assets and passes to the index page where all assets are displayed
    Asset.find({}, function(err, foundAssets){
      if(!err){
        res.render("index", {foundAssets: foundAssets});
      }
    });
  }, 500)
});

//ROOT - POST ROUTE
app.post("/", function(req, res){
  Asset.findOne({number: req.body.number}, function(err, foundAsset){
    if(!err){
      // checks if asset number already exists
      if(foundAsset){
        // renders the error page is the asset already exists
        res.render("adderror", {foundAsset: foundAsset});
      } else {
        // if asset does not exist, new asset is created based on the user input and saved to the db
        const newAsset = new Asset({
          type: req.body.type,
          number: req.body.number,
          model: _.capitalize(req.body.model),
          location: req.body.location
        });
        newAsset.save();
        res.redirect("/");
      }
    }
  });
});

//EDIT ID - GET ROUTE
app.get("/edit/:assetid", function(req, res){
  const assetID = req.params.assetid;
  // looks for asset based on id and...
  //displays the edit page after user has clicked the edit button for an individual asset
  Asset.findOne({_id: assetID}, function(err, foundAsset){
    if(!err){
      res.render("edit", {foundAsset: foundAsset});
    }
  });
});

//EDIT ID - POST ROUTE
app.post("/edit/:assetid", function(req, res){
  // looks up asset based on id then changes this asset to user input
  Asset.findOne({_id: req.params.assetid}, function(err, foundAsset){
    if(!err){
      foundAsset.type = req.body.type;
      foundAsset.number = req.body.number;
      foundAsset.model = _.capitalize(req.body.model);
      foundAsset.location = _.toUpper(req.body.location);
      // checks to see if the user input id matches any asset already in the db
      Asset.findOne({number: req.body.number}, function(err, found){
        if(!err){
          // if there are no matches this means the asset can be saved
          if(!found || found._id == req.params.assetid){
            foundAsset.save();
              res.redirect("/");
              // if there is a match then the updated asset is not saved and display error page - preventing duplicate assets
          } else {
            res.render("error", {foundAsset: found, assetid:req.params.assetid});
          }
        }
      });
    }
  });
});

//FILTER ARRAY
const assetsFilter = [];
//FILTER TITLE
let filterTitle = "";

//FILTER ASSET - POST ROUTE
app.post("/filter/:filteredAsset", function(req, res){
    const filteredAsset = req.body.filtered;
    // looks up all assets
    Asset.find({}, function(err, foundAssets){
      if(!err){
        // loops through all assets and finds assets that match the filter selected
      foundAssets.forEach(function(asset){
        // if assets are found based on filter then they get saved in the filter array otherwise do nothing
        if(asset.type === filteredAsset || asset.location === filteredAsset){
          assetsFilter.push(asset);
        }
        // title is updated regardless if assets are found or not
        filterTitle = filteredAsset;
      });
      res.redirect("/filter");
    }
  });
});

//FILTER - GET ROUTE
app.get("/filter", function(req, res){
  // passes the array to the filter page based on the filter post route. If nothing in the array then displays empty table
  res.render("filter", {assetsFilter: assetsFilter, filterTitle: filterTitle});
  // empties the array to allow for another filter to be selected
  assetsFilter.length = 0;
});

//DELETE - POST ROUTE
app.post("/delete", function(req, res){
  // looks up asset based on id and removes. This runs when user clicks the delete button for an individual asset
  const assetId = req.body.deleteBtn;
  Asset.findByIdAndRemove(assetId, function(err){
    if(!err){
      res.redirect("/");
    }
  });
});

//LISTENER
app.listen(3000, function(){
  console.log("Server started on port 3000");
});
