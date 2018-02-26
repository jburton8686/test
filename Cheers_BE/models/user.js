'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const slug = require("slug");

const UserSchema = new mongoose.Schema({
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
    yelpId: {
        type: String,
        lowercase: true,
        unique: true
    }
}, { timestamps: true });

UserSchema.pre("validate", function (next) {
    // if (!this.slug) {
    this.slugify();
    // }
    next();
});

UserSchema.methods.slugify = function () {
    if (this.address === "undefined") {
        this.slug = slug(this.user_name);
    } else {
        this.slug = `${slug(this.user_name)}-${slug(this.address)}`;
    }
};

UserSchema.methods.toJSONForParsing = function () {
    return {
        slug: this.slug,
        user_name: this.user,
        password: this.password,
        bar_name: this.name,
        address: this.address,
        phone: this.phone,
        type_of_bar: this.type_of_bar,
        bar_details: this.bar_details,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

var User = mongoose.model("User", UserSchema);

module.exports = User;
