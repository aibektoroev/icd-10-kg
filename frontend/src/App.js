import React, { useState, useEffect, useContext, useRef } from "react";
import NavBar from "./components/nav-bar";
import NavTree from "./components/nav-tree";
import MKBList from "./components/mkb-list";
import MKBItemDetailed from "./components/mkb-item-detailed";
import EditorModal from "./components/editor-modal";
import axios from "axios";
import axiosInstance from "./axios";
import Swal from "sweetalert2";
import utils from "./utils";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "./context";

function App() {
  // #region ----------------- Variables and States ------------------------

  const { setIsLoggedIn } = useContext(AppContext);

  const { page, pid } = useParams();

  const navigate = useNavigate();

  const rootParent = { id: 0, mkb_code: "МКБ-10", sign: "", title: "Классы" };

  const [data, setData] = useState({
    currentParent: rootParent,
    treeNodes: [rootParent],
    items: [],
  });

  const [navTreeHeight, setNavTreeHeight] = useState(56);

  const [editData, setEditData] = useState({
    item: {
      mkb_code: "",
      sign: "",
      title: "",
      subtitle: "",
      actual: true,
      act_date: null,
      parent: 0,
    },
    isEditing: false,
  });

  const [scrollPosition, setScrollPosition] = useState("top");

  const scrollRefs = useRef({});

  // #endregion

  const scrollTo = (refName) => {
    scrollRefs.current &&
      scrollRefs.current[refName] &&
      scrollRefs.current[refName].scrollIntoView();
  };

  // refresh list of items for the given parent record (get it's child records)
  async function loadChildItemsOf(parent) {
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
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Что-то пошло не так...",
          html: `<p>${error.message}</p>`,
        });
      });
  }

  // Loads content for the given page id (which is actually the parent record's id)
  async function loadPage(page_id) {
    setScrollPosition("top");

    let parent = null;

    if (page_id && page_id > 0) {
      // get record by id and set it to parent
      await axios
        .get(process.env.REACT_APP_API_URL + `records/${page_id}`)
        .then((res) => {
          parent = res.data;
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Что-то пошло не так...",
            html: `<p>${error.message}</p>`,
          });
        });
    } else {
      parent = rootParent;
    }

    // refresh list of items for the given parent record (get it's child records)
    loadChildItemsOf(parent);
  }

  // Loads the page containing the given mkb code and navigates to it
  async function navigateToCode(code) {
    let processed_code = "";
    let parent = null;

    await axios
      .get(process.env.REACT_APP_API_URL + "getparentbycode", {
        params: { mkb_code: code },
      })
      .then((res) => {
        if (res.status === 204) {
          Swal.fire({
            icon: "error",
            title: "Нерабочая ссылка...",
            html:
              "<pre>Не удалось обнаружить запись по указанной ссылке!<br/>Вы поможете улучшить приложение, если сообщите нам об этой ошибке...<br/></pre>" +
              String.fromCodePoint(0x1f917),
          });

          return;
        }

        processed_code = res.data.processed_code;
        parent = res.data.parent;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Что-то пошло не так...",
          html: `<p>${error.message}</p>`,
        });
      });

    if (!processed_code || !parent) return;

    setScrollPosition(processed_code);

    // Refresh list with new items
    await loadChildItemsOf(parent).then(() => {
      // Make some animation effect on the target item
      let targetItem = document.getElementById("item-" + processed_code);
      utils.animateTargetItem(targetItem);
    });
  }

  useEffect(() => {
    // On component did mount do:
    // Check tokens expiration: if expired then set isLoggedIn state to false, else to true

    // Check tokens expiration
    const token = utils.getToken();

    setIsLoggedIn(token.valid);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleRequest = async () => {
      if (!page || !pid) {
        loadPage(0);
        return;
      }

      switch (page) {
        case "page": // if caller requested for a page
          loadPage(pid);
          break;

        case "code": // if caller requested for an mkb code
          navigateToCode(pid);
          break;

        default:
          break;
      }
    };

    handleRequest();

    // DEBUG logs
    console.log("The pid has changed and it's value is : " + pid);
    console.log("page is : " + page + " pid is : " + pid);
  }, [pid]);

  useEffect(() => {
    // calculate current top offset
    const topOffset = document.getElementById("nav-tree").clientHeight + 56;

    if (navTreeHeight === topOffset) {
      scrollTo(scrollPosition);
    } else setNavTreeHeight(topOffset);
  }, [data]);

  useEffect(() => {
    scrollTo(scrollPosition);
  }, [navTreeHeight]);

  //#region ----------------- EDITOR HANDLING FUNCS ------------------------

  const [modal, setModal] = useState(false);

  const toggleEditor = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (
      editData.item.sign &&
      editData.item.mkb_code.slice(-1) !== editData.item.sign
    )
      editData.item.mkb_code += editData.item.sign;

    if (editData.isEditing) toggleEditor();
  }, [editData]);

  const handleAddItem = () => {
    const newItem = {
      mkb_code: "",
      sign: "",
      title: "",
      subtitle: "",
      actual: true,
      act_date: null, // use new Date() then .toISOString().slice(0, 10);
      parent: data.currentParent.id,
    };

    setEditData({ item: JSON.parse(JSON.stringify(newItem)), isEditing: true });
  };

  const handleEditItem = (selectedItem) => {
    setEditData({
      item: JSON.parse(JSON.stringify(selectedItem)),
      isEditing: true,
    });
  };

  const handleEditorSubmit = (editItem) => {
    toggleEditor();

    // Check if there is a '+' or '*' sign in mkb_code
    const lastChar = editItem.mkb_code.slice(-1);

    if ("+*".includes(lastChar)) {
      editItem.mkb_code = editItem.mkb_code.slice(0, -1);

      editItem.sign = lastChar;
    } else {
      editItem.sign = "";
    }

    // Set current scroll position
    sessionStorage.setItem("scrollPosition", window.pageYOffset);

    const request = async () => {
      return editItem.id
        ? axiosInstance.put(`records/${editItem.id}/`, editItem) // PUT:  edit item
        : axiosInstance.post(`records/`, editItem); // POST: create new item
    };

    request()
      .then((res) => {
        loadChildItemsOf(data.currentParent);
      })
      .then(() => {
        setScrollPosition(editItem.mkb_code);
        utils.scrollToLastPosition();
      })
      .catch((error) => {
        let errorMessage = "";

        if (error.response) {
          // Request made and server responded

          if ([401, 403].includes(error.response.status)) {
            setIsLoggedIn(false);

            Swal.fire({
              icon: "warning",
              title: `Статус ${error.response.status}`,
              html: "Активная сессия истекла. Для выполнения данной операции необходимо авторизоваться в системе...",

              confirmButtonColor: "#3085d6",
              confirmButtonText: "Пройти авторизацию",

              showCancelButton: true,
              cancelButtonColor: "#d33",
              cancelButtonText: "Отмена",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/login");
              }
            });
          } else {
            errorMessage = error.response.data.mkb_code
              ? "Запись с таким кодом уже существует"
              : error.message;
          }
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = error.message;
        }

        if (errorMessage)
          Swal.fire({
            icon: "error",
            title: "Что-то пошло не так...",
            html: `<p>При отправке данных на сервер произошла ошибка:</p><p>${errorMessage}.</p>`,
          });
      });
  };

  //#endregion

  return (
    <React.Fragment>
      <div id="wrapper">
        <NavBar />

        <NavTree
          id="nav-tree"
          parent={data.currentParent}
          nodes={data.treeNodes}
          onAddItemClicked={handleAddItem}
        />

        <span
          className="scroll-pos"
          style={{ scrollMarginTop: navTreeHeight }}
          ref={(el) => (scrollRefs.current.top = el)}
        />
        {data.currentParent.mkb_code.includes(".") ? (
          <MKBItemDetailed />
        ) : (
          <MKBList
            items={data.items}
            scrollRefs={scrollRefs}
            navTreeHeight={navTreeHeight}
            editItemHandler={handleEditItem}
          />
        )}

        {modal ? (
          <EditorModal
            editItem={editData.item}
            submitHandler={handleEditorSubmit}
            toggle={toggleEditor}
          />
        ) : null}
      </div>
    </React.Fragment>
  );
}

export default App;
