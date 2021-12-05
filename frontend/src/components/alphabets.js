import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import utils from "../utils";
import "./styles/alphabet.css";

export default function Alphabets() {
  const { cat_id, group_id } = useParams();

  const [items, setItems] = useState({ group: null, alphabets: [] });

  async function loadItems(group_id) {
    await axios
      .get(process.env.REACT_APP_API_URL + "alphabets", {
        params: { group: group_id },
      })
      .then((res) => {
        setItems({ group: res.data.group, alphabets: res.data.alphabets });
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

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="card">
          <div className="card-header text-center">
            {items.group && items.group.name}
          </div>
          <ul className="list-group list-group-flush">
            {items.alphabets.map((alphabet) => {
              return (
                <li key={alphabet.id} className="list-group-item">
                  <h6>
                    {alphabet.id}: {utils.parseMKBCodesInText(alphabet.phrase)}
                  </h6>
                  <pre className="text-description">
                    {utils.parseMKBCodesInText(alphabet.details)}
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
