const mongoose = require("mongoose");
const Paginate = require("mongoose-paginate-v2");

const CourseSchema = mongoose.Schema({
    title: String,
    miniature: String,
    description: String,
    url: String,
    price: Number,
    score: Number,
});

CourseSchema.plugin(Paginate);
module.exports = mongoose.model("Course", CourseSchema);
