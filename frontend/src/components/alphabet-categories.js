import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import axiosInstance from "../axios";
import "./styles/alphabet.css";

export default function AlphabetCategories() {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  async function loadCategories() {
    await axios
      .get(process.env.REACT_APP_API_URL + "alphabet_categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Что-то пошло не так...",
          html: `<p>${error.message}</p>`,
        });
      });
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const handleTestCreateItem = (e) => {
    e.preventDefault();

    const item = {
      name: "Лекарственные средства и химические вещества",
      details:
        "Для каждого вещества указан код рубрики класса XIX для отравлений (T36-T65) и коды внешней причины класса XX для: случайного отравления и воздействия ядовитых веществ (X40-X49), преднамеренного самоповреждения (X60-X69), повреждения в результате отравления с неопределенными намерениями (Y10-Y19). Также даны коды рубрик для кодирования лекарственных средств, медикаментов и биологических веществ, вызывающих неблагоприятные реакции при терапевтическом применении (Y40-Y59). ",
    };

    axiosInstance
      .post(`alphabet_categories/`, item)
      .then((res) => {
        loadCategories();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Что-то пошло не так...",
          html: `<p>${error.message}</p>`,
        });
      });
  };

  const categoryClickedHandler = (e, category) => {
    e.preventDefault();
    // pass the selected category item to route /alphabet/:category

    navigate(`/alphabet/${category.id}`);

    console.log(category.id);
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="card">
          <div className="card-header text-center">
            Алфавитные указатели МКБ-10
          </div>
          <ul className="list-group list-group-flush">
            {categories.map((category) => {
              return (
                <li key={category.id} className="list-group-item">
                  <a
                    href="#"
                    onClick={(e) => {
                      categoryClickedHandler(e, category);
                    }}
                  >
                    {category.name}
                  </a>
                  <pre className="text-description">{category.details}</pre>
                </li>
              );
            })}
          </ul>
        </div>
        {/*
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleTestCreateItem}
        >
          TEST CREATE
        </button> */}
      </div>
    </React.Fragment>
  );
}
