import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import utils from "../utils";
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

  const categoryClickedHandler = (e, category) => {
    e.preventDefault();

    navigate(`/alphabet/${category.id}`);
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
                    href={`/alphabet/${category.id}`}
                    onClick={(e) => {
                      categoryClickedHandler(e, category);
                    }}
                  >
                    {category.name}
                  </a>
                  <pre className="text-description">
                    {utils.parseMKBCodesInText(category.details)}
                  </pre>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
