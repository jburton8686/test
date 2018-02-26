'use strict';

var mongoose = require("mongoose");
const slug = require("slug");

const AdminSchema = new mongoose.Schema({
    admin_name: {
        type: String,
        required: true
    },
    admin_password: {
        type: String,
        required: true
    },
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
    slug: {
        type: String,
        lowercase: true,
        unique: true
    }
}, { timestamps: true });

AdminSchema.pre("validate", function (next) {
    // if (!this.slug) {
    this.slugify();
    // }
    next();
});

AdminSchema.methods.slugify = function () {
    if (this.address === "undefined") {
        this.slug = slug(this.bar_name);
    } else {
        this.slug = `${slug(this.bar_name)}-${slug(this.address)}`;
    }
};

BarSchema.methods.toJSONForParsing = function () {
    return {
        slug: this.slug,
        admin_name: this.admin,
        admin_password: this.admin_password,
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

var Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
