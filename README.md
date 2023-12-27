# API REST con Node.js y Express

Este repositorio contiene una API REST desarrollada en Node.js y Express para gestionar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en una base de datos MongoDB. La API también incluye funcionalidades para el manejo de archivos utilizando Google Cloud Storage.

# Tecnologías Utilizadas

- **Node.js:** Entorno de ejecución para JavaScript del lado del servidor.
- **Express:** Framework web para Node.js que simplifica el desarrollo de aplicaciones y APIs.
- **MongoDB:** Base de datos NoSQL utilizada para almacenar y gestionar los datos de la aplicación.
- **Google Cloud Storage:** Servicio de almacenamiento en la nube de Google, utilizado para guardar imágenes.

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

## Endpoints
   

| Ruta                   | Método | Descripción                                      |
|------------------------|--------|--------------------------------------------------|
| `/user/me`             | GET    | Obtiene la información del usuario actual.      |
| `/users`               | GET    | Obtiene la lista de todos los usuarios.          |
| `/user`                | POST   | Crea un nuevo usuario con un avatar.            |
| `/user/:id`            | PATCH  | Actualiza la información de un usuario por ID.  |
| `/user/:id`            | DELETE | Elimina un usuario por ID.                       |
| `/post`                | POST   | Crea una nueva publicación con una miniatura.   |
| `/post`                | GET    | Obtiene la lista de todas las publicaciones.    |
| `/menu`                | POST   | Crea un nuevo menú.                              |
| `/menu`                | GET    | Obtiene la lista de todos los menús.             |
| `/menu/:id`            | PATCH  | Actualiza la información de un menú por ID.     |
| `/menu/:id`            | DELETE | Elimina un menú por ID.                          |
| `/courses`             | POST   | Crea un nuevo curso con una miniatura.          |
| `/courses`             | GET    | Obtiene la lista de todos los cursos.           |
| `/courses/:id`         | PATCH  | Actualiza la información de un curso por ID.   |
| `/courses/:id`         | DELETE | Elimina un curso por ID.                         |


En la API que he desarrollado, utilizo middlewares de autenticación para asegurar que ciertas rutas o endpoints requieran autorización antes de permitir el acceso o la ejecución de operaciones específicas. Esto se logra a través de la función `md_auth.asureAuth`, que lleva a cabo la verificación de la autenticación, probablemente mediante la validación de tokens JWT (JSON Web Tokens).

### `md_auth.asureAuth`

- **Propósito:** Garantizar que el usuario esté autenticado antes de permitir el acceso a ciertos endpoints.
- **Cómo funciona:** Este middleware verifica la presencia y validez de un token JWT en la cabecera de la solicitud. Si el token es válido, se considera que el usuario está autenticado y se permite que la solicitud continúe; de lo contrario, se devuelve un error de autenticación.

### `upload.single('avatar')` y `upload.single('miniature')`

- **Propósito:** Gestionar la carga de archivos (avatar, miniature) en las solicitudes POST y PATCH.
- **Cómo funciona:** Estos middlewares están asociados con la gestión de archivos y utilizan la función `multer` para manejar la carga de un solo archivo en las solicitudes. Aseguran que la solicitud contenga un archivo específico (avatar o miniature) antes de permitir que la operación continúe.

