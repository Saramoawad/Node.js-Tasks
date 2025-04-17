

const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());



//get all todos
//get  /todos    >>   todos
// app.get("/todos", (req, res) => {
//   fs.readFile("data.json", "utf-8", (err, data) => {
//     res.send(data);
//   });
// });

//save new todo
// post   /todos
app.post("/todos", (req, res) => {
  let newTodo = req.body;
  //   console.log(newTodo);
  fs.readFile("data.json", "utf-8", (err, data) => {
    let todos = JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile("data.json", JSON.stringify(todos), (err) => {
      res.status(201).json({
        data: newTodo,
        message: "todo added successfully",
        status: "success",
      });
    });
  });
});

//get by id
//get     /todos/id   >> todo
// app.get("/todos/:id", (req, res) => {
//   const { id } = req.params;

//   fs.readFile("data.json", "utf-8", (err, data) => {
//     const todos = JSON.parse(data);

//     const todo = todos.find((todo) => todo.id == id);
//     if (todo) {
//       return res.json({
//         data: todo,
//         message: "todo found",
//         status: "success",
//       });
//     } else {
//       return res.status(404).json({
//         message: "todo not found",
//         status: "fail",
//       });
//     }
//   });
// });

const port = 3000;
app.listen(port, () => {
  console.log(`server started listening on port ${port}`);
});
// delete todo by id
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile("data.json", "utf-8", (err, data) => {
    let todos = JSON.parse(data);
    const index = todos.findIndex((todo) => todo.id == id);

    if (index === -1) {
      return res.status(404).json({
        message: "todo not found",
        status: "fail",
      });
    }

    const deletedTodo = todos.splice(index, 1)[0];

    fs.writeFile("data.json", JSON.stringify(todos), (err) => {
      res.json({
        message: "todo deleted successfully",
        status: "success",
        data: deletedTodo,
      });
    });
  });
});

// edit todo (PATCH)
app.patch("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { title, status } = req.body;

  fs.readFile("data.json", "utf-8", (err, data) => {
    let todos = JSON.parse(data);
    let todo = todos.find((todo) => todo.id == id);

    if (!todo) {
      return res.status(404).json({
        message: "todo not found",
        status: "fail",
      });
    }

    if (title) todo.title = title;
    if (status && ['new', 'inProgress', 'done'].includes(status)) {
      todo.status = status;
    }

    fs.writeFile("data.json", JSON.stringify(todos), (err) => {
      res.json({
        message: "todo updated successfully",
        status: "success",
        data: todo,
      });
    });
  });
});

// GET todos with query filter (limit & skip)
app.get("/todos", (req, res) => {
    let { limit = 10, skip = 0 } = req.query;
    limit = parseInt(limit);
    skip = parseInt(skip);
  
    fs.readFile("data.json", "utf-8", (err, data) => {
      let todos = JSON.parse(data);
      const result = todos.slice(skip, skip + limit).map(todo => ({
        title: todo.title,
        status: todo.status
      }));
  
      res.json(result);
    });
  });
  
