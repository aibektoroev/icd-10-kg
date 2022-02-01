import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./styles/alphabet.css";

export default function AlphabetGroups() {
  const { cat_id } = useParams();

  const navigate = useNavigate();

  const [items, setItems] = useState({ category: null, groups: [] });

  async function loadGroups(cat_id) {
    await axios
      .get(process.env.REACT_APP_API_URL + "alphabet_groups", {
        params: { category: cat_id },
      })
      .then((res) => {
        setItems({ category: res.data.category, groups: res.data.groups });
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

  const groupClickedHandler = (e, group) => {
    e.preventDefault();

    if (group.is_static) {
      navigate(`/alphabet/static/${group.component}/${group.id}`);
    } else {
      navigate(`/alphabet/${cat_id}/${group.id}`);
    }
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="card">
          <div className="card-header text-center">
            {items.category && items.category.name}
          </div>
          <ul className="list-group list-group-flush">
            {items.groups.map((group) => {
              return (
                <li key={group.id} className="list-group-item">
                  {group.is_static ? (
                    <a
                      href={`/alphabet/static/${group.component}/${group.id}`}
                      onClick={(e) => {
                        groupClickedHandler(e, group);
                      }}
                    >
                      {group.name}
                    </a>
                  ) : (
                    <a
                      href={`/alphabet/${cat_id}/${group.id}`}
                      onClick={(e) => {
                        groupClickedHandler(e, group);
                      }}
                    >
                      {group.name}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
