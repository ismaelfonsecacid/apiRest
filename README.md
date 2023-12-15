# Documentación de la API

## /menu

### Obtener Menú

#### GET /menu
Obtiene la lista completa de elementos del menú.

### Crear Elemento de Menú

#### POST /menu
Crea un nuevo elemento en el menú.

### Obtener Detalles de Elemento de Menú

#### GET /menu/{id}
Obtiene los detalles de un elemento específico del menú.

### Modificar Elemento de Menú

#### PATCH /menu/{id}
Modifica un elemento específico del menú.

### Eliminar Elemento de Menú

#### DELETE /menu/{id}
Elimina un elemento específico del menú.

## /user

### Obtener Usuarios

#### GET /user
Obtiene la lista completa de usuarios.

### Crear Usuario

#### POST /user
Crea un nuevo usuario.

### Obtener Detalles de Usuario

#### GET /user/{id}
Obtiene los detalles de un usuario específico.

### Modificar Usuario

#### PATCH /user/{id}
Modifica un usuario específico.

### Eliminar Usuario

#### DELETE /user/{id}
Elimina un usuario específico.

## /auth

### Iniciar Sesión

#### POST /auth/login
Permite a un usuario iniciar sesión y obtiene un token de autenticación.

### Cerrar Sesión

#### POST /auth/logout
Cierra la sesión actual del usuario y revoca el token de autenticación.

### Renovar Token

#### POST /auth/refresh
Renueva el token de autenticación.


