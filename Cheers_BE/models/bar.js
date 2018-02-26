"use strict";

var mongoose = require("mongoose");
const slug = require("slug");

const BarSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    bar_name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: false
    },
    phone: {
      type: Number,
      required: false
    },
    type_of_bar: {
      type: String,
      required: false
    },
    bar_details: {
      type: String,
      required: false
    },
    yelp_id: {
      type: String,
      unique: false
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true
    }
  },
  { timestamps: true }
);

BarSchema.pre("validate", function(next) {
  // if (!this.slug) {
  this.slugify();
  // }
  next();
});

BarSchema.methods.slugify = function() {
  if (this.address === "undefined") {
    this.slug = slug(this.bar_name);
  } else {
    this.slug = `${slug(this.bar_name)}-${slug(this.address)}`;
  }
};

BarSchema.methods.toJSONForParsing = function() {
  return {
    slug: this.slug,
    user_name: this.user_name,
    password: this.password,
    bar_name: this.name,
    address: this.address,
    phone: this.phone,
    type_of_bar: this.type_of_bar,
    bar_details: this.bar_details,
    yelp_id: this.yelp_id,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

var Bar = mongoose.model("Bar", BarSchema);

module.exports = Bar;
