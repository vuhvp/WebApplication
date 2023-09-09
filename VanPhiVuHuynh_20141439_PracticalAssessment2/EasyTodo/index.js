const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

/* ----------------------------------------- */
/*                CONFIGS                    */
/* ----------------------------------------- */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "pug");

mongoose
  .connect("mongodb+srv://vuhvp:SCMhyJhGRWGI4zE8@assignment2.5dr68.mongodb.net/EasyTodo")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

/* ----------------------------------------- */
/*                MODELS                     */
/* ----------------------------------------- */

const todoSchema = new mongoose.Schema({
  taskName: { type: String },
});

const Todo = mongoose.model("Todo", todoSchema);

/* ----------------------------------------- */
/*                FUNCTIONS                  */
/* ----------------------------------------- */

async function getTodoList() {
  const todoList = await Todo.find({});
  return todoList;
}

async function addTodo(taskName) {
  const todo = new Todo({
    taskName: taskName,
  });
  const result = await todo.save();
  return result;
}

async function deleteTodo(id) {
  const result = await Todo.deleteOne({
    _id: id,
  });
  return result;
}

/* ----------------------------------------- */
/*                ROUTES                     */
/* ----------------------------------------- */

app.get("/", async (req, res) => {
  const todoList = await getTodoList();
  res.render("index", { todoList: todoList });
});

app.post("/todo", async (req, res) => {
  const taskName = req.body.taskName;
  const result = await addTodo(taskName);
  res.send(result);
});

app.delete("/todo/:todoId", async (req, res) => {
  const id = req.params.todoId;
  const result = await deleteTodo(id);
  res.send(result);
});

app.listen(3000, () => console.log("Listening on port 3000"));
