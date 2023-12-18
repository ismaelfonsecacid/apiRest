const Course = require("../models/course");
const image = require("../utils/image");
const fs = require('fs').promises; // Assuming you're using Node.js >= 10.0.0


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
  const{page=1,limit=10} = req.query;
  const options = {
    page,
    limit:parseInt(limit)
  };

  try {
    const courses = await Course.paginate({}, options);
    res.status(200).send(courses);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener los cursos" });
  }
}


async function updateCourse(req, res) {
  const { id } = req.params;
  const courseData = req.body;

  try {
    if (req.files.miniature) {
      const imagePath = image.getFileName(req.files.miniature);

      // Delete the old miniature file if it exists
      const oldCourse = await Course.findById(id);
      if (oldCourse.miniature) {
        const oldImagePath = `./uploads/${oldCourse.miniature}`;
        await fs.unlink(oldImagePath);
      }
      courseData.miniature = imagePath;
    }

    const response = await Course.findByIdAndUpdate({ _id: id }, courseData);

    if (!response) {
      res.status(400).send({ msg: "Error al actualizar el curso" });
    } else {
      res.status(200).send({ msg: "Actualizacion correcta" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).send({ msg: "Error en el servidor" });
  }
}




module.exports = {
  createCourse,
  getCourses,
  updateCourse
};
