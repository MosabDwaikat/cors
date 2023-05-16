import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState(0);
  const [add, setAdd] = useState({
    id: "",
    title: "",
    description: "",
  });
  const handleGetAll = () => {
    axios.get("http://localhost:5000/todos/").then((res) => {
      setTodos(res.data);
    });
  };
  const handleSearch = () => {
    const id = document.getElementsByName("search")[0].value;
    if (!id) alert("enter valid id");
    else
      axios
        .get("http://localhost:5000/todos/" + id)
        .then((res) => {
          setTodos([res.data]);
        })
        .catch((error) => {
          alert("ID does not exist");
        });
  };
  const handleNew = () => {
    const id = document.getElementsByName("id-tf")[0];
    const title = document.getElementsByName("title-tf")[0];
    const description = document.getElementsByName("description-tf")[0];

    if (!id.value) alert("enter valid id");
    else if (!title.value) alert("enter valid title");
    else if (!description.value) alert("enter valid description");
    else {
      const body = { title: title.value, description: description.value };
      axios
        .post("http://localhost:5000/todos/" + id.value, body)
        .then((res) => {
          setAdd({
            id: "",
            title: "",
            description: "",
          });
          alert("todo added");
          handleGetAll();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  const handleUpdate = (e) => {
    const id = e.target.name.slice(0, -3);
    axios
      .put("http://localhost:5000/todos/" + id)
      .then((res) => {
        handleGetAll();
      })
      .catch((error) => {
        alert("ID does not exist");
      });
  };
  const handleDelete = (e) => {
    const id = e.target.name.slice(0, -3);
    axios
      .delete("http://localhost:5000/todos/" + id)
      .then((res) => {
        handleGetAll();
      })
      .catch((error) => {
        alert("ID does not exist");
      });
  };

  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAdd({ ...add, [name.slice(0, -3)]: value });
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <main>
      <h1 className="title">The TODOS we never DO</h1>
      <div className="body">
        <div className="control-panel">
          <ul className="controls">
            <li>
              <button className="control-btn" onClick={handleGetAll}>
                Get all Todos
              </button>
            </li>
            <li>
              <label className="lbl">Search Todo by ID</label>
              <input
                type="number"
                min={1}
                value={search}
                onChange={handleSearchChange}
                name="search"
                className="tf"
                autoComplete="off"
              />
              <button className="control-btn" onClick={handleSearch}>
                Search
              </button>
            </li>

            <li>
              <label className="lbl">Create new todo</label>
              <input
                placeholder="ID"
                type="number"
                min={1}
                value={add.id}
                onChange={handlechange}
                name="id-tf"
                className="tf"
                autoComplete="off"
              />
              <input
                placeholder="Title"
                type="text"
                value={add.title}
                onChange={handlechange}
                name="title-tf"
                className="tf"
                autoComplete="off"
              />
              <input
                placeholder="Description"
                type="text"
                value={add.description}
                onChange={handlechange}
                name="description-tf"
                className="tf"
                autoComplete="off"
              />
              <button className="control-btn" onClick={handleNew}>
                New
              </button>
            </li>
          </ul>
        </div>
        <div className="todos-panel">
          <ul>
            {todos.map((e, i) => {
              return (
                <li key={i}>
                  <div>
                    <h3>{e.title}</h3>
                    <p>{e.description}</p>
                    <p className="status">{e.status}</p>
                    <div>
                      <button
                        className="list-btn"
                        onClick={handleUpdate}
                        name={e.id + "upd"}
                      >
                        update
                      </button>
                      <button
                        className="list-btn"
                        onClick={handleDelete}
                        name={e.id + "del"}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Home;
