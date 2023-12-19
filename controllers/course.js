const Course = require("../models/course");
const image = require("../utils/image");
const fs = require('fs').promises; // Assuming you're using Node.js >= 10.0.0
const { Storage } = require("@google-cloud/storage");

const dotenv = require('dotenv');
dotenv.config();
try {
  require('dotenv').config();
} catch (err) {
  console.error('Error cargando dotenv:', err);
}

const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY
};

const storage = new Storage({
  projectId: "apirest-408512", // Reemplaza con el ID de tu proyecto
  credentials: credentials,
});

const bucket = storage.bucket("apirest-isma"); // Reemplaza con el nombre de tu cubo

const multer = require("multer");
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });



async function createCourse(req, res) {
  const course = new Course(req.body);

 
  try {
    if (req.file) {
      const fileName = await uploadToStorage(req.file);
      course.miniature = fileName;
    }
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

async function deleteCourse(req, res) {
  const { id } = req.params;

  try {
    const courseToDelete = await Course.findById(id);

    // If the course exists, delete its associated miniature file
    if (courseToDelete) {
      if (courseToDelete.miniature) {
        const imagePath = `./uploads/${courseToDelete.miniature}`;
        await fs.unlink(imagePath);
      }
      await Course.findByIdAndDelete(id);
      res.status(200).send({ msg: "Course eliminado" });
    } else {
      res.status(404).send({ msg: "Course no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al eliminar el Course" });
  }
}


async function uploadToStorage(file) {
  return new Promise((resolve, reject) => {
    const fileName = `course/${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on("error", (error) => {
      console.error(error);
      reject(new Error("Error al subir la imagen a Google Cloud Storage"));
    });

    stream.on("finish", () => {
      resolve(fileName);
    });

    stream.end(file.buffer);
  });
}

async function deleteFromStorage(fileName) {
  try {
    await bucket.file(fileName).delete();
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar la imagen de Google Cloud Storage");
  }
}




module.exports = {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse
};
