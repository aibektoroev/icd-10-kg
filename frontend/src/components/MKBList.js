import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import NavTree from "./NavTree";
import MKBItem from "./MKBItem";
import EditorModal from "./EditorModal";
import axios from "axios";
import Swal from "sweetalert2";

function MKBList() {
  const [isEditMode, setEditMode] = useState(false);

  const [nodes, setTreeNodes] = useState([{ id: 0, mkb_code: "МКБ-10" }]);

  const [items, setItems] = useState([]);

  const [currentParent, setCurrentParent] = useState(-1);

  const [editItem, setEditItem] = useState({
    mkb_code: "",
    title: "",
    subtitle: "",
    contents: "",
    actual: true,
    act_date: null,
    parent: 0,
  });

  function jumpto(anchor) {
    window.location.href = "#" + anchor;
  }

  const scrollToLastPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      sessionStorage.removeItem("scrollPosition");
    }

    console.log("Scrolled back to last postition !!!!!!!!!!!!!");
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //Make some animation effect on the target item
  async function animateTargetItem(targetItem) {
    for (let i = 0; i < 3; i++) {
      targetItem.classList.toggle("mkb-title-fade");
      await sleep(500);
      targetItem.classList.toggle("mkb-title-fade");
      await sleep(500);
    }
  }

  async function refreshItems(parent) {
    // if (parent === currentParent) return;   // TEST THIS LATER !!!

    await axios
      .get(process.env.REACT_APP_API_URL + "filterbyparent", {
        params: { parent: parent },
      })
      .then((res) => {
        setTreeNodes(res.data.parents);

        setItems(res.data.mkb_records);

        setCurrentParent(parent);
      });
  }

  useEffect(() => {
    const loadInitialData = async () => {
      await refreshItems(0);

      jumpto("top");
    };

    loadInitialData();

    // eslint-disable-next-line
  }, []);

  async function titleClickedHandler(selectedItem) {
    if (selectedItem.id === nodes.at(-1).id) {
      return;
    }

    await refreshItems(selectedItem.id).then(() => {
      jumpto("top");
    });
  }

  async function treeNodeClickedHandler(e, node_id) {
    e.preventDefault();

    await refreshItems(node_id).then(() => {
      jumpto("top");
    });
  }

  async function embeddedLinkClickedHandler(e, link) {
    e.preventDefault();

    let processed_code = "";
    let parent = null;

    await axios
      .get(process.env.REACT_APP_API_URL + "getparentbycode", {
        params: { mkb_code: link },
      })
      .then((res) => {
        if (res.status !== 200) {
          return;
        }

        processed_code = res.data.processed_code;
        parent = res.data.parent;
      });

    if (processed_code === "") {
      Swal.fire({
        icon: "error",
        title: "Нерабочая ссылка...",
        html:
          "<pre>Не удалось обнаружить запись по указанной ссылке!<br/>Вы поможете улучшить приложение, если сообщите нам об этой ошибке...<br/></pre>" +
          String.fromCodePoint(0x1f917),
      });

      return;
    }

    // Refresh list with new items
    await refreshItems(parent).then(() => {
      jumpto("anchor-at-" + processed_code);
    });

    // Make some animation effect on the target item
    let targetItem = document.getElementById("item-title-" + processed_code);
    animateTargetItem(targetItem);
  }

  function handleSearchItemClicked(e, mkb_code) {
    console.log("Search item clicked! mkb_code : " + mkb_code);

    embeddedLinkClickedHandler(e, mkb_code);
  }

  //#region ----------------- EDITOR HANDLING FUNCS ------------------------

  const [modal, setModal] = useState(false);

  const toggleEditor = () => {
    setModal(!modal);
  };

  const handleAddItem = () => {
    const newItem = {
      mkb_code: "",
      title: "",
      subtitle: "",
      contents: "",
      actual: true,
      act_date: null, // use new Date() then .toISOString().slice(0, 10);
      parent: currentParent,
    };

    setEditItem(newItem);

    toggleEditor();
  };

  const handleEditItem = (selectedItem) => {
    setEditItem(selectedItem);

    toggleEditor();
  };

  const handleEditorSubmit = (editItem) => {
    toggleEditor();

    // Set current scroll position
    sessionStorage.setItem("scrollPosition", window.pageYOffset);

    if (editItem.id) {
      // if existing item then update (PUT)
      axios
        .put(
          process.env.REACT_APP_API_URL + `records/${editItem.id}/`,
          editItem
        )
        .then((res) => {
          refreshItems(editItem.parent);
        })
        .then(() => {
          scrollToLastPosition();
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Что-то пошло не так...",
            html: `При отправке данных на сервер возникла ошибка: ${error.message}`,
          });
        });
    } else {
      // if new item then create (POST)
      axios
        .post(process.env.REACT_APP_API_URL + "records/", editItem)
        .then((res) => {
          refreshItems(editItem.parent);
        })
        .then(() => {
          scrollToLastPosition();
        })
        .catch((error) => {
          if (error.response) {
            let errorMessage = error.response.data.mkb_code
              ? "Запись с таким кодом уже существует!"
              : `Ошибка: ${JSON.stringify(error.response.data)}`;

            Swal.fire({
              icon: "error",
              title: `Статус ${error.response.status}`,
              html: errorMessage,
            });
          }
        });
    }
  };

  //#endregion

  const navTreeStyles = {
    top: "56px",
    padding: "12px 5px",
    maxWidth: "1080px",
    marginLeft: "auto",
    marginRight: "auto",
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 1)",
    zIndex: 99,
  };

  return (
    <>
      <NavBar searchItemClickedHandler={handleSearchItemClicked} />

      <div
        className="d-flex fixed-top justify-content-between"
        style={navTreeStyles}
      >
        <NavTree
          nodes={nodes}
          onTreeNodeClicked={treeNodeClickedHandler}
          className="d-inline-block ms-0 ps-0"
        />
        {isEditMode ? (
          <span
            className="badge text-dark cursor-pointer d-inline-block py-2 me-1"
            onClick={handleAddItem}
            style={{ backgroundColor: "#7CFC00" }}
          >
            Добавить
          </span>
        ) : null}
      </div>

      <ol
        className="list-group list-group-numbered"
        style={{ marginTop: "45px" }}
      >
        {/* eslint-disable-next-line */}
        <a id="top" className="anchor" href="/#" />
        {items.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-start rounded m-0 p-1"
          >
            {/* eslint-disable-next-line */}
            <a id={"anchor-at-" + item.mkb_code} className="anchor" href="/#" />
            <MKBItem
              item={item}
              onTitleClicked={titleClickedHandler}
              onEmbeddedLinkClicked={embeddedLinkClickedHandler}
              editItemHandler={handleEditItem}
            />
          </li>
        ))}
      </ol>

      {modal ? (
        <EditorModal
          editItem={editItem}
          submitHandler={handleEditorSubmit}
          toggle={toggleEditor}
        />
      ) : null}
    </>
  );
}

export default MKBList;
