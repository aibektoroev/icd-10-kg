import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import axiosInstance from "../axios";
import "./styles/alphabet.css";

export default function Alphabets() {
  const { group_id } = useParams();

  const [items, setItems] = useState([]);

  async function loadItems(group_id) {
    await axios
      .get(process.env.REACT_APP_API_URL + "alphabets", {
        params: { group: group_id },
      })
      .then((res) => {
        setItems(res.data.alphabets);
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
    loadItems(group_id);
  }, []);

  /*

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
        loadGroups(cat_id);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Что-то пошло не так...",
          html: `<p>${error.message}</p>`,
        });
      });
  };

  */

  const groupClickedHandler = (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="card">
          <div className="card-header text-center">Аб-Ад</div>
          <ul className="list-group list-group-flush">
            {items.map((item) => {
              return (
                <li key={item.id} className="list-group-item">
                  <a href="/#" onClick={groupClickedHandler}>
                    {item.phrase}
                  </a>
                  <pre className="text-description">{item.details}</pre>
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
