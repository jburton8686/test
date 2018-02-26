"use strict";

var express = require("express");
var router = express.Router();
var _ = require("lodash");
var mongodb = require("mongodb");
const Bar = require("../models/bar");
var cors = require("cors");

express().options("*", cors());

express().use(cors());
express().options("*", cors());
/* TEST that this is listening. Verified working 2018-02-12 cpilson. */
router.route("/test").get(function(req, res, next) {
  res.render("index", {
    title: "Hello from the Cheers back-end server",
    output: "This endpoint is listening!"
  });
});

/* GET all bars. Verified working 2018-02-12 cpilson. */
router.route("/").get(function(req, res, next) {
  Bar.find({})
    .sort({ updatedAt: "desc" })
    .exec(function(err, payload) {
      if (err) {
        next(err);
      } else {
        res.send(payload);
      }
    });
});

/* GET one bar, using its ID field. Verified working 2018-02-12 cpilson. */
router.route("/:barID").get(function(req, res, next) {
  Bar.findOne({ _id: req.params.barID })
    .then(function(bar) {
      if (!bar) {
        return res.sendStatus(404);
      }
      res.send({ bar: bar });
    })
    .catch(next);
});

/* ADD a new bar. Verified working 2018-02-12 cpilson. */
// TODO: Add error-checking logic if desired. Check to see if you're about to
// add a duplicate bar.
router.route("/").post(function(req, res, next) {
  var bar = new Bar({
    user_name: req.body.user_name || "",
    password: req.body.password || "",
    bar_name: req.body.bar_name,
    address: req.body.address || "",
    phone: req.body.phone,
    type_of_bar: req.body.type_of_bar || "",
    bar_details: req.body.bar_details || "",
    yelp_id: req.body.yelp_id || ""
  });

  // .save() in Mongoose is a promise. We'll consume that here.
  return bar
    .save()
    .then(function() {
      return res.send(bar);
    })
    .catch(next);
});

/* EDIT a bar. Verified working 2018-02-12 cpilson. */
// TODO: Fix Bar, Bar, Bar, Bar... Don't redefine (ideally).
router.route("/:id").put((req, res) => {
  var Barid = new mongodb.ObjectID(req.params["id"]);
  Bar.find(
    {
      _id: Barid
    },
    function(err, Bar) {
      if (err) {
        res.status(500).send(err);
      } else {
        var Bar = Bar[0];
        Bar.user_name = req.body.user_name || Bar.user_name;
        Bar.password = req.body.password || Bar.password;
        Bar.bar_name = req.body.bar_name || Bar.bar_name;
        Bar.address = req.body.address || Bar.address;
        Bar.phone = req.body.phone || Bar.phone;
        Bar.type_of_bar = req.body.type_of_bar || Bar.type_of_bar;
        Bar.bar_details = req.body.bar_details || Bar.bar_details;
        Bar.yelp_id = req.body.yelp_id || Bar.yelp_id;

        Bar.save(function(err, Bar) {
          if (err) {
            res.status(500).send(err);
          }
          res.send(Bar);
        });
      }
    }
  );
});

/* DELETE a bar. Verified working 2018-02-12 cpilson. */
router.route("/:id").delete((req, res) => {
  var Barid = new mongodb.ObjectID(req.params["id"]);
  Bar.remove(
    {
      _id: Barid
    },
    function(err, result) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(`Deleted bar with ID of ${Barid}`);
      }
    }
  );
});

module.exports = router;
