const Course = require("../models/course");
const image = require("../utils/image");


async function createCourse(req, res) {
  const course = new Course(req.body);

  const imagePath = image.getFileName(req.files.miniature);
  course.miniature = imagePath;

  try {
    const courseStored = await course.save();
    res.status(200).send(courseStored);
  } catch (error) {
    res.status(400).send({ msg: "Error en el proceso de curso" });
  }
}

async function getCourses(req, res) {
  const options = {
    page: 1,
    limit: 10,
  };

  try {
    const courses = await Course.paginate({}, options);
    res.status(200).send(courses);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener los cursos" });
  }
}


module.exports = {
  createCourse,
  getCourses
};
