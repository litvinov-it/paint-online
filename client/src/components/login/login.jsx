import React, { useState } from "react";
import classes from "./login.module.css";
import { wsState } from "../../store/wsState";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [value, setValue] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    const sessionId = `f${(+new Date()).toString(16)}`;
    connect(sessionId);
  };

  const handleLogin = async () => {
    const isRoom = await axios
      .get("http://localhost:5000/id-room", {
        params: {
          id: value,
        },
      })
      .then((response) => response.data.isRoom);

    if (isRoom) connect(value);
    else alert("Такой комнаты не существует");
  };

  function connect(sessionId) {
    wsState.setSessionId(sessionId);
    wsState.send({
      method: "connection",
      name: `${username}`,
    });
    navigate(`/${sessionId}`);
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Login</h1>

      <input
        className={classes.input}
        type="text"
        placeholder="Имя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className={classes.login}>
        <input
          className={classes.input}
          type="text"
          placeholder="Введи id комнаты"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button onClick={handleLogin} className={classes.btn}>Войти</button>
      </div>

      <button className={classes.create} onClick={handleCreate}>
        Создать{" "}
      </button>
    </div>
  );
};
