import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./App.css";
import { CircleCheckBig } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [post, setPost] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/todo")
      .then((response) => {
        setPost(response.data);
      })
      .catch(() => {
        console.log("Erro ao buscar dados");
      });
  }, []);

  const handleCreateTask = () => {
    const data = { todo: newTask };

    axios
      .post("http://localhost:8080/todo", data)
      .then((response) => {
        console.log("Tarefa criada com sucesso");
        setPost((prevPosts) => [...prevPosts, response.data]);
        setNewTask("");
      })
      .catch(() => {
        console.log("Erro ao criar tarefa");
      });
  };

  const handleDeleteTask = (id) => {
    axios
      .delete(`http://localhost:8080/todo/${id}`)
      .then(() => {
        console.log("Tarefa excluída com sucesso");
        setPost((prevPosts) => prevPosts.filter((item) => item.idTodo !== id));
      })
      .catch(() => {
        console.log("Erro ao excluir tarefa");
      });
  };

  const handleEditTask = (id) => {
    const updatedTask = { todo: editTaskValue };

    axios
      .put(`http://localhost:8080/todo/${id}`, updatedTask)
      .then(() => {
        console.log("Tarefa atualizada com sucesso");
        setPost((prevPosts) =>
          prevPosts.map((item) =>
            item.idTodo === id ? { ...item, todo: editTaskValue } : item
          )
        );
        setEditTask(null);
        setEditTaskValue("");
      })
      .catch(() => {
        console.log("Erro ao atualizar tarefa");
      });
  };

  return (
    <>
      <div className="cabecalho">
        <CircleCheckBig />
        <h1>To-do</h1>
      </div>
      <div className="inputlista">
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button variant="contained" onClick={handleCreateTask}>
          Criar
        </Button>
      </div>

      <div>
        <div className="lista-todo">
          <p>Tarefas criadas:</p>
          <ul className="ultexte">
            {post &&
              post.map((item) => (
                <li key={item.idTodo} className="itemidTodo">
                  {editTask === item.idTodo ? (
                    <TextField
                      value={editTaskValue}
                      onChange={(e) => setEditTaskValue(e.target.value)}
                      onBlur={() => handleEditTask(item.idTodo)}
                      autoFocus
                    />
                  ) : (
                    <>
                      {item.todo}
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setEditTask(item.idTodo);
                          setEditTaskValue(item.todo);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteTask(item.idTodo)}
                      >
                        Excluir
                      </Button>
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
