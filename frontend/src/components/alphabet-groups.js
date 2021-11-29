import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import axiosInstance from "../axios";
import "./styles/alphabet.css";

export default function AlphabetGroups() {
  const { cat_id } = useParams();

  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);

  async function loadGroups(cat_id) {
    await axios
      .get(process.env.REACT_APP_API_URL + "alphabet_groups", {
        params: { category: cat_id },
      })
      .then((res) => {
        setGroups(res.data.groups);
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
    loadGroups(cat_id);
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

  const groupClickedHandler = (e, group) => {
    e.preventDefault();

    navigate(`/alphabet/${cat_id}/${group.id}`);
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="card">
          <div className="card-header text-center">
            Алфавитный указатель болезней и травм по их характеру МКБ-10
          </div>
          <ul className="list-group list-group-flush">
            {groups.map((group) => {
              return (
                <li key={group.id} className="list-group-item">
                  <a
                    href="/#"
                    onClick={(e) => {
                      groupClickedHandler(e, group);
                    }}
                  >
                    {group.name}
                  </a>
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
