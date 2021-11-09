import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import NavTree from "./NavTree";
import MKBItem from "./MKBItem";
import EditorModal from "./EditorModal";
import axios from "axios";
import Swal from "sweetalert2";
import utils from "../utils";

function MKBList() {
  // #region ----------------- Variables and States ------------------------

  const rootParent = { id: 0, mkb_code: "МКБ-10", title: "Классы" };

  const [isEditMode, setEditMode] = useState(true);

  const [data, setData] = useState({
    currentParent: rootParent,
    treeNodes: [rootParent],
    items: [],
  });

  const [navTreeHeight, setNavTreeHeight] = useState(56);

  const [editItem, setEditItem] = useState({
    mkb_code: "",
    title: "",
    subtitle: "",
    contents: "",
    actual: true,
    act_date: null,
    parent: 0,
  });

  const [jumpPosition, setJumpPosition] = useState("top-pos");

  // #endregion

  async function refreshItems(parent) {
    // if (parent === currentParent) return;   // TEST THIS LATER !!!

    await axios
      .get(process.env.REACT_APP_API_URL + "filterbyparent", {
        params: { parent: parent.id },
      })
      .then((res) => {
        setData({
          currentParent: parent,
          treeNodes: res.data.parents,
          items: res.data.mkb_records,
        });
      });
  }

  useEffect(() => {
    const loadInitialData = async () => {
      setJumpPosition("top-pos");

      await refreshItems(rootParent);
    };

    loadInitialData();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // calculate current top offset
    const topOffset = document.getElementById("nav-tree").clientHeight + 56;

    if (navTreeHeight === topOffset) {
      utils.jumpto(jumpPosition);
    } else setNavTreeHeight(topOffset);
  }, [data]);

  useEffect(() => {
    utils.jumpto(jumpPosition);
  }, [navTreeHeight]);

  async function titleClickedHandler(selectedItem) {
    if (selectedItem.id === data.treeNodes.at(-1).id) {
      return;
    }

    setJumpPosition("top-pos");

    await refreshItems(selectedItem);
  }

  async function treeNodeClickedHandler(e, node) {
    e.preventDefault();

    setJumpPosition("top-pos");

    await refreshItems(node);
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

    setJumpPosition("anchor-at-" + processed_code);

    // Refresh list with new items
    await refreshItems(parent).then(() => {
      // Make some animation effect on the target item
      let targetItem = document.getElementById("item-title-" + processed_code);
      utils.animateTargetItem(targetItem);
    });
  }

  function handleSearchItemClicked(e, mkb_code) {
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
      parent: data.currentParent,
    };

    setEditItem(newItem);

    toggleEditor();
  };

  const handleEditItem = (selectedItem) => {
    setEditItem(selectedItem);

    console.log("Edit item clicked!");

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
          refreshItems(data.currentParent);
        })
        .then(() => {
          utils.scrollToLastPosition();
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Что-то пошло не так...",
            html: `<pre>При отправке данных на сервер произошла ошибка:<p>${error.message}. ${error.response.data.detail}</p></pre>`,
          });
        });
    } else {
      // if new item then create (POST)
      axios
        .post(process.env.REACT_APP_API_URL + "records/", editItem)
        .then((res) => {
          refreshItems(data.currentParent); //editItem.parent);
        })
        .then(() => {
          utils.scrollToLastPosition();
        })
        .catch((error) => {
          if (error.response) {
            console.log(JSON.stringify(error.response));

            let errorMessage = error.response.data.mkb_code
              ? "Запись с таким кодом уже существует!"
              : `Ошибка: ${error.response.data.detail}`;

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

  return (
    <>
      <NavBar searchItemClickedHandler={handleSearchItemClicked} />

      <NavTree
        id="nav-tree"
        parent={data.currentParent}
        nodes={data.treeNodes}
        isEditMode={isEditMode}
        onTreeNodeClicked={treeNodeClickedHandler}
        onAddItemClicked={handleAddItem}
      />

      <a
        id="top-pos"
        className="anchor"
        href="/#"
        style={{ scrollMarginTop: navTreeHeight }}
      />

      <ol className="list-group list-group-numbered">
        {/* eslint-disable-next-line */}

        {data.items &&
          data.items.map((item) => (
            <li key={item.id} className="list-group-item rounded m-0 p-1">
              {/* eslint-disable-next-line */}
              <a
                id={"anchor-at-" + item.mkb_code}
                className="anchor"
                href="/#"
                style={{ scrollMarginTop: navTreeHeight }}
              />
              <MKBItem
                item={item}
                isEditMode={isEditMode}
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
