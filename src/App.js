import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositorys, setRepositorys] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositorys(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo projeto ${Date.now()}`,
      owner: "Khalleb",
    });

    const project = response.data;
    setRepositorys([...repositorys, project]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const projectIndex = repositorys.findIndex(
      (repository) => repository.id === id
    );
    repositorys.splice(projectIndex, 1);
    setRepositorys([...repositorys]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositorys.map((repository) => (
          <li key={repository?.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository?.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
