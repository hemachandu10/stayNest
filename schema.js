const joi=require("joi");
const Review = require("./models/review");

const listingSchema=joi.object({
    listing:joi.object({
        title:joi.string().required(),
        description:joi.string().required(),
        price:joi.number().required().min(0),
        location:joi.string().required(),
        country:joi.string().required(),
        address: joi.string().required(),
        contactNumber: joi.string().required(),
        image:joi.string().allow("", null)
    }).required()
})

const ReviewSchema=joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required()
}).required();

exports.listingSchema=listingSchema;
exports.ReviewSchema=ReviewSchema;
