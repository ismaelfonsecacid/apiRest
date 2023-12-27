const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");
const app = express();

app.get("/api/v1", (req, res) => {

  // Crear una documentación de API con estilo Swagger moderno
  const apiDocumentation = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>API Documentation</title>
      <style>
       body {
        font-family: "Inter var",ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
         margin: 0;
         padding: 0;
       background-color: #f5f5f5;
       scroll-behavior: smooth;
  }
  
  header {
    background-color: #1e88e5;
    color: white;
    padding: 1em;
    text-align: center;
    font-size: 1.5em;
    height: 3em !important;
  }
  .code-container {
        background-color: #333;
        border-radius: 5px;
        margin: 20px;
        overflow: auto;
        padding: 16px;
      }
  
      .language-javascript {
        color: #d4d4d4;
      }
  ::-webkit-scrollbar {
    display: none;
  }
  
  code {
  
    padding: 2px 4px;
    border-radius: 4px;
  }
  
  
  .endpoint-section {
    display: grid;
    flex-wrap: wrap;
    border: 1px solid gray;
      margin: 1%;
      border-radius: 20px;
  }
  
  .endpoint-block {
    width: 99% !important;
    box-sizing: border-box;
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f0f0f0;
  }
  
  .endpoint-block th,
  .endpoint-block td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }
  
  .postT {
    background-color: #5cb85c;
    color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
  }
  
  .getT {
    background-color: #5bc0de;
    color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
  }
  
  .patchT {
    background-color: #f0ad4e;
    color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
  }
  
  .deleteT {
    background-color: #d9534f;
    color: #fff;
    padding: 4px 8px;
    border-radius: 3px;
  }
  
  .top {
    display: flex;
    justify-content: space-between;
    margin: 0 2%;
    align-items: center;
  
  }
  .info{
    display: flex;
      align-items: center;
  }
  
  
  .button-39 {
    background-color: #FFFFFF;
    border: 1px solid rgb(209,213,219);
    border-radius: .5rem;
    box-sizing: border-box;
    color: #111827;
    font-family: "Inter var",ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-size: .875rem;
    font-weight: 600;
    line-height: 1.25rem;
    text-align: center;
    text-decoration: none #D1D5DB solid;
    text-decoration-thickness: auto;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    height: 50%;
    
  }
  
  .button-39:hover {
    background-color: rgb(249,250,251);
  }
  
  .button-39:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  
  .button-39:focus-visible {
    box-shadow: none;
  }
  
  
      </style>
    <header>
      API Documentation
      <p>Version: 1.0</p>
    </header>
    </head>
  
    <body>
      <div class="endpoint-section">
        <div class="top">
          <h1>User</h1>
          <button onclick="toggleEndpoints('user_endpoints')" class="button-39">
            Toggle Endpoints
          </button>
        </div>
      
        <table class="endpoint-block user_endpoints" style="display: none">
          <tr>
            <th>HTTP Method</th>
            <th>Endpoint</th>
            <th>Description</th>
          </tr>
          <tr>
            <td><span class="postT">POST</span></td>
            <td>/user</td>
            <td>
              <div class="info">
                <div>
                  <span>Create a new user.</sp>
                  <button onclick="showInfo('userInfo')">Info</button>
                </div>
                <div class="endpoint-section-2">
                  <div id="userInfo" style="display: none">
                    <pre class="code-container">
                      <code class="language-javascript">
  const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { 
    type: String, 
    unique: true 
  },
  password: String,
  role: String,
  active: Boolean,
  avatar: String,
  });
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td><span class="getT">GET</span></td>
            <td>/users</td>
            <td>Get all users.</td>
          </tr>
          <tr>
            <td><span class="getT">GET</span></td>
            <td>/user/me</td>
            <td>Get the current user.</td>
          </tr>
          <tr>
            <td><span class="patchT">PATCH</span></td>
            <td>/user/:id</td>
            <td>Update a user by ID.</td>
          </tr>
          <tr>
            <td><span class="deleteT">DELETE</span></td>
            <td>/user/:id</td>
            <td>Delete a user by ID.</td>
          </tr>
        </table>
      </div>
  
  
  
      <div class="endpoint-section">
        <div class="top">
          <h1>Menu</h1>
          <button onclick="toggleEndpoints('menu_endpoints')" class="button-39">
            Toggle Endpoints
          </button>
        </div>
      
        <table class="endpoint-block menu_endpoints" style="display: none">
          <tr>
            <th>HTTP Method</th>
            <th>Endpoint</th>
            <th>Description</th>
          </tr>
          <tr>
            <td><span class="postT">POST</span></td>
            <td>/menu</td>
            <td>
              <div class="info">
                <div>
                  <span>Create a new menu.</sp>
                  <button onclick="showInfo('menuInfo')">Info</button>
                </div>
                <div class="endpoint-section-2">
                  <div id="menuInfo" style="display: none">
                    <pre class="code-container">
                      <code class="language-javascript">
  const MenuSchema = mongoose.Schema({
    title: String,
    path: String,
    order: Number,
    active: Boolean,
  })
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td><span class="getT">GET</span></td>
            <td>/menu</td>
            <td>Get all menus.</td>
          </tr>
          <tr>
            <td><span class="patchT">PATCH</span></td>
            <td>/menu/:id</td>
            <td>Update a menu by ID.</td>
          </tr>
          <tr>
            <td><span class="deleteT">DELETE</span></td>
            <td>/menu/:id</td>
            <td>Delete a menu by ID.</td>
          </tr>
        </table>
      </div>
  
      <div class="endpoint-section">
        <div class="top">
          <h1>Course</h1>
          <button onclick="toggleEndpoints('course_endpoints')" class="button-39">
            Toggle Endpoints
          </button>
        </div>
      
        <table class="endpoint-block course_endpoints" style="display: none">
          <tr>
            <th>HTTP Method</th>
            <th>Endpoint</th>
            <th>Description</th>
          </tr>
          <tr>
            <td><span class="postT">POST</span></td>
            <td>/course</td>
            <td>
              <div class="info">
                <div>
                  <span>Create a new course.</sp>
                  <button onclick="showInfo('courseInfo')">Info</button>
                </div>
                <div class="endpoint-section-2">
                  <div id="courseInfo" style="display: none">
                    <pre class="code-container">
                      <code class="language-javascript">
  const CourseSchema = mongoose.Schema({
    title: String,
    miniature: String,
    description: String,
    url: String,
    price: Number,
    score: Number,
  });
                      </code> 
                    </pre>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td><span class="getT">GET</span></td>
            <td>/menu</td>
            <td>Get all menus.</td>
          </tr>
          <tr>
            <td><span class="patchT">PATCH</span></td>
            <td>/menu/:id</td>
            <td>Update a menu by ID.</td>
          </tr>
          <tr>
            <td><span class="deleteT">DELETE</span></td>
            <td>/menu/:id</td>
            <td>Delete a menu by ID.</td>
          </tr>
        </table>
      </div>
      <div class="endpoint-section">
        <div class="top">
          <h1>Auth</h1>
          <button onclick="toggleEndpoints('auth_endpoints')" class="button-39">
            Toggle Endpoints
          </button>
        </div>
      
        <table class="endpoint-block auth_endpoints" style="display: none">
          <tr>
            <th>HTTP Method</th>
            <th>Endpoint</th>
            <th>Description</th>
          </tr>
  
          <tr>
            <td><span class="postT">Post</span></td>
            <td>/auth/register</td>
            <td>Register an user.</td>
          </tr>
          <tr>
            <td><span class="postT">Post</span></td>
            <td>/auth/login</td>
            <td>Login.</td>
          </tr>
        </table>
      </div>
  
      <div class="endpoint-section">
        <div class="top">
          <h1>Post</h1>
          <button onclick="toggleEndpoints('post_endpoints')" class="button-39">
            Toggle Endpoints
          </button>
        </div>
      
        <table class="endpoint-block post_endpoints" style="display: none">
          <tr>
            <th>HTTP Method</th>
            <th>Endpoint</th>
            <th>Description</th>
          </tr>
          <tr>
            <td><span class="postT">POST</span></td>
            <td>/post</td>
            <td>
              <div class="info">
                <div>
                  <span>Create a new post.</sp>
                  <button onclick="showInfo('postInfo')">Info</button>
                </div>
                <div class="endpoint-section-2">
                  <div id="postInfo" style="display: none">
                    <pre class="code-container">
                      <code class="language-javascript">
  const PostSchema = mongoose.Schema({
    title:String,
    miniature: String,     
    content: String,
    path: {
      type: String,
      unique:true,
    }  ,
    created_at: Date,
  })
                      </code> 
                    </pre>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td><span class="getT">GET</span></td>
            <td>/post</td>
            <td>Get all menus.</td>
          </tr>
          <tr>
            <td><span class="patchT">PATCH</span></td>
            <td>/post/:id</td>
            <td>Update a post by ID.</td>
          </tr>
          <tr>
            <td><span class="deleteT">DELETE</span></td>
            <td>/post/:id</td>
            <td>Delete a post by ID.</td>
          </tr>
        </table>
      </div>
        <script>
          function showInfo(path) {
            const userInfoDiv = document.getElementById(path);
            userInfoDiv.style.display = userInfoDiv.style.display === "none" ? "block" : "none";
          }
        function toggleEndpoints(className) {
          var sections = document.querySelectorAll("." + className);
          sections.forEach(function (section) {
            var displayStyle = window.getComputedStyle(section).display;
            section.style.display =
              displayStyle === "none" || displayStyle === "" ? "" : "none";
          });
        }
      </script>
      <script>
  
      </script>
    </body>
  </html>
  

  `;

  // Enviar la documentación de la API como respuesta
  res.send(apiDocumentation);
});

//Import rutas
const authRoutes = require("./router/auth");
const userRoutes = require("./router/user");
const menuRoutes = require("./router/menu");
const courseRoutes = require("./router/course");
const postRoutes = require("./router/post");

//Configurar body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure static folder
app.use(express.static("uploads"));

//Configure CORS
app.use(cors());

//Configure routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);

module.exports = app;
