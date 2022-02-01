import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import utils from "../../utils";

export default function Chemicals(props) {
  const [items, setItems] = useState({ group: null, chemicals: [] });

  async function loadItems(group_id) {
    await axios
      .get(process.env.REACT_APP_API_URL + "chemicals", {
        params: { group: group_id },
      })
      .then((res) => {
        setItems({ group: res.data.group, chemicals: res.data.chemicals });
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
    loadItems(props.group_id);
  }, []);

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-header text-center">
          <h5>
            Алфавитный указатель лекарственных средств и химических веществ
            МКБ-10: {items.group && items.group.name}
          </h5>
        </div>

        <table className="table table-sm table-bordered mt-4">
          <tbody>
            <tr>
              <th rowspan="2">Вещество</th>
              <th colspan="4" className="text-center">
                Отравление
              </th>
              <th rowspan="2" style={{ maxWidth: "4em" }}>
                Небла­го­при­ятное воздей­ствие при тера­пев­тичес­ком
                приме­нении
              </th>
            </tr>
            <tr>
              <th style={{ maxWidth: "4em" }}>Класс XIX</th>
              <th style={{ maxWidth: "4em" }}>случай­ное</th>
              <th style={{ maxWidth: "4em" }}>
                наме­рен­ное само­по­вреж­дение
              </th>
              <th style={{ maxWidth: "4em" }}>нео­преде­лен­ное наме­рение</th>
            </tr>
            {items.chemicals &&
              items.chemicals.map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td className="text-center">
                      {item.code_1 && utils.parseMKBCodesInText(item.code_1)}
                    </td>
                    <td className="text-center">
                      {item.code_2 && utils.parseMKBCodesInText(item.code_2)}
                    </td>
                    <td className="text-center">
                      {item.code_3 && utils.parseMKBCodesInText(item.code_3)}
                    </td>
                    <td className="text-center">
                      {item.code_4 && utils.parseMKBCodesInText(item.code_4)}
                    </td>
                    <td className="text-center">
                      {item.code_5 && utils.parseMKBCodesInText(item.code_5)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
