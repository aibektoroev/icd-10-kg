import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Alphabet() {
  const [categories, setCategories] = useState([]);

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

  return (
    <React.Fragment>
      <div id="wrapper">
        {categories.map((category) => {
          return (
            <div key={category.id}>
              <h5>{category.name}</h5>
              <h6>{category.details}</h6>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
