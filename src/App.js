import React, { useState, useEffect } from 'react';
import api from "./services/api";

import "./styles.css";


export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    })
  }, []);


  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: "www.murielrm.com.br",
      techs: []
    });

    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`/repositories/${id}`)
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);    
    
    repositories.splice(repositoryIndex, 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => (

          <li key={repository.id}>

            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
};
