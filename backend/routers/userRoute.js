const express = require("express");
const user_route = express.Router();
const authJWT = require("../middleware/userAuth");
const userController = require("../controllers/userController");
const todoController=require("../controllers/todoController")



// ==========================User=========================//
user_route.post("/register", userController.register);
user_route.post("/verify_otp", userController.verification);
user_route.post("/resetPasswordOtp", userController.resetPasswordOtp);
user_route.post("/verifiyNewPassword", userController.verifyNewPassword);
user_route.post("/newPassword", userController.newPassword);
user_route.post("/userLogin",userController.userLogin);
user_route.get("/token_v", authJWT,userController.authUser);



// ============================Todo=======================//

user_route.post("/todo/:usersId",authJWT,todoController.createTodo)
user_route.get("/todo/:usersId",authJWT,todoController.getTodoList)
user_route.delete('/todoDelete/:todoId',authJWT,todoController.deleteTodo)
user_route.post('/todoComplete/:todoId',authJWT,todoController.completeTodo)
user_route.put('/todoUpdate/:todoId',authJWT,todoController.todoUpdation)

module.exports = user_route;
