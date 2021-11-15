import React, { useState, useContext } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
//MaterialUI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppContext from "../context";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
    background: "#1186ca",
    fontWeight: "bold",
  },
  centeredText: {
    textAlign: "center",
  },
  errorMsg: {
    margin: theme.spacing(1, 0),
    color: "red",
  },
  homeLink: {
    textDecoration: "none",
  },
}));

export default function Login() {
  const { setIsLoggedIn } = useContext(AppContext);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setErrorMessage("");

    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username) {
      setErrorMessage("Введите имя пользователя");
      // set focus to username input field

      return;
    }

    if (!formData.password) {
      setErrorMessage("Введите пароль");
      // set focus to password input field

      return;
    }

    console.log(formData);

    axiosInstance
      .post(`token/`, {
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);

        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");

        setIsLoggedIn(true);

        navigate("/");

        // TO DO :
        // if authorized then enable EditMode in an .env
        // then go to homepage
        // else show animation and text message that login credentials are incorrect
      })
      .catch((error) => {
        if (error.response)
          if ([401, 403].includes(error.response.status))
            setErrorMessage(
              "Ошибка авторизации. Пожалуйста, проверьте правильность ввода."
            );
          else setErrorMessage(error.response.data.details);
        else setErrorMessage(error.message);
      });
  };

  const goHome = (e) => {
    e.preventDefault();

    navigate("/");
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>

        <h4 className={classes.centeredText}>Вход</h4>
        <h6 className={classes.centeredText}>
          для зарегистрированных пользователей
        </h6>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Имя пользователя"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />

          <h6 className={classes.errorMsg}>{errorMessage}</h6>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Войти
          </Button>
        </form>

        <a href="#" onClick={goHome} className={classes.homeLink}>
          Вернуться на главную
        </a>
      </div>
    </Container>
  );
}
