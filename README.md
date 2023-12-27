# API REST con Node.js y Express

Este repositorio contiene una API REST desarrollada en Node.js y Express para gestionar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una base de datos MongoDB. La API también incluye funcionalidades para el manejo de archivos utilizando Google Cloud Storage.

## Dependencias

A continuación se enumeran las principales dependencias utilizadas en este proyecto:

```json
{
    "@google-cloud/storage": "^7.7.0",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.2",
    "connect-multiparty": "^2.2.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.1",
    "mongoose-paginate-v2": "^1.7.4",
    "multer": "^1.4.5-lts.1",
    "nodemon": "^3.0.1"
}
```

1. **@google-cloud/storage (^7.7.0):**
   - **Descripción:** Cliente oficial de Google Cloud Storage para Node.js. Permite interactuar con el servicio de almacenamiento en la nube de Google para gestionar y manipular archivos.

2. **bcryptjs (^2.4.3):**
   - **Descripción:** Biblioteca de cifrado utilizada para hashear contraseñas. Proporciona funciones de hashing seguras y lentas, ideales para almacenar contraseñas de manera segura.

3. **body-parser (^1.20.2):**
   - **Descripción:** Middleware para Express que facilita el análisis del cuerpo de las solicitudes HTTP. Se utiliza para procesar los datos enviados en el cuerpo de las solicitudes, como formularios.

4. **connect-multiparty (^2.2.0):**
   - **Descripción:** Middleware para manejar datos de formularios enviados a través de solicitudes multipart/form-data. Útil para la carga de archivos.

5. **cors (^2.8.5):**
   - **Descripción:** Middleware para Express que habilita el manejo de solicitudes CORS (Cross-Origin Resource Sharing), permitiendo solicitudes desde dominios diferentes al del servidor.

6. **dotenv (^16.3.1):**
   - **Descripción:** Carga variables de entorno desde un archivo .env en el entorno de desarrollo.

7. **express (^4.18.2):**
   - **Descripción:** Framework web para Node.js que facilita la creación de aplicaciones y APIs.

8. **jsonwebtoken (^9.0.2):**
   - **Descripción:** Implementa la generación y verificación de JSON Web Tokens (JWT) para autenticación.

9. **mongoose (^8.0.1):**
   - **Descripción:** Biblioteca para modelar objetos MongoDB y simplificar las interacciones con la base de datos.

10. **mongoose-paginate-v2 (^1.7.4):**
    - **Descripción:** Plugin de paginación para Mongoose.

11. **multer (^1.4.5-lts.1):**
    - **Descripción:** Middleware para manejar la carga de archivos en Node.js.

12. **nodemon (^3.0.1):**
    - **Descripción:** Herramienta que reinicia automáticamente la aplicación Node.js cuando se detectan cambios en el código fuente durante el desarrollo.
