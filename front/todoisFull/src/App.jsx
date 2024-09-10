import Button from "@mui/material/Button";
import "./App.css";
import { CircleCheckBig } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [post, setPost] = useState();
  const [newTask, setNewTask] = useState("");

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

  return (
    <>
      <div className="cabecalho">
        <CircleCheckBig />
        <h1>Todo</h1>
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
          <p>Tarefas criadas</p>
          <ul>
            {post && post.map((item) => <li key={item.idTodo}>{item.todo}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
