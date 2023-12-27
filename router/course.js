
const express = require("express")
const multiparty = require("connect-multiparty")
const CourseController = require("../controllers/course")
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({uploadDir:"./uploads/course"})
const multer = require('multer');


const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });
const api = express.Router();


api.post("/courses",[md_auth.asureAuth,upload.single('miniature')],CourseController.createCourse)
api.get("/courses",CourseController.getCourses)
api.patch("/courses/:id",[md_auth.asureAuth,upload.single('miniature')],CourseController.updateCourse)
api.delete("/courses/:id",[md_auth.asureAuth,md_upload],CourseController.deleteCourse)


module.exports = api






