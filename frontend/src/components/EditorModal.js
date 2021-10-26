import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import "./editorstyles.css";

function EditorModal(props) {
  const [editItem, setEditItem] = useState(props.editItem);

  const [isChanged, setIsChanged] = useState(false);

  const [mkbCodeValid, setMkbCodeValid] = useState(false);

  const [titleValid, setTitleValid] = useState(false);

  const [isFormValid, setFormValid] = useState(false);

  /* TO DO :

  + Implement data vlaidation !!!
  + Check if editItem is changed !!!
  + TEST: POST (new item): make it's id = 0
  + TEST: PUT (existing item)
  - TEST: if actual changed then set act_date to DateTime Now
  */

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line
  }, [editItem]);

  useEffect(() => {
    setFormValid(mkbCodeValid && titleValid);
  }, [mkbCodeValid, titleValid]);

  // Form validation
  const validateForm = () => {
    // mkb_code
    const re =
      /^[A-Z]{1}\d{2}-[A-Z]{1}\d{2}$|^[A-Z]{1}\d{2}\.{1}\d{1}[+*]?$|^[A-Z]{1}\d{2}[+*]?$/;

    setMkbCodeValid(re.test(editItem.mkb_code));

    // mkb_title
    setTitleValid(editItem.title.length > 0);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //Make some animation effect on invalid field
  async function animateInvalidField(fieldName) {
    console.log("Animate " + fieldName);

    let targetField = document.getElementById("editor-" + fieldName);

    if (!targetField) return;

    targetField.focus();

    for (let i = 0; i < 3; i++) {
      targetField.classList.toggle(fieldName + "-fade");
      await sleep(500);
      targetField.classList.toggle(fieldName + "-fade");
      await sleep(500);
    }
  }

  const handleChange = (e) => {
    //e.preventDefault();

    let fieldName = e.target.name;
    let newValue = "";

    if (fieldName === "actual") newValue = e.target.checked;
    else newValue = e.target.value;

    const newItem = { ...editItem, [fieldName]: newValue };

    setEditItem(newItem);

    setIsChanged(true);
  };

  const onSubmit = (e) => {
    if (!isFormValid) {
      !titleValid && animateInvalidField("title");
      !mkbCodeValid && animateInvalidField("mkb-code");

      return;
    }

    if (isChanged) props.submitHandler(editItem);
    else props.toggle();
  };

  return (
    <Modal
      isOpen={true}
      toggle={props.toggle}
      centered={true}
      autoFocus={false}
      size="lg"
    >
      <ModalHeader>
        {editItem.id ? "Редактирование записи" : "Новая запись"}
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup className="form-group">
            <Label for="mkb_code" className="text-secondary">
              Код МКБ
            </Label>
            <Input
              id="editor-mkb-code"
              className="mkb-code"
              type="text"
              name="mkb_code"
              value={editItem.mkb_code}
              onChange={handleChange}
              autoFocus={true}
              invalid={!mkbCodeValid}
            />
            <FormFeedback>
              Код должен иметь формат вида A00-Z99 | A09 | A09* | A09+ | A09.1 |
              A09.1* | A09.1+
            </FormFeedback>
          </FormGroup>

          <FormGroup className="form-group">
            <Label for="title" className="text-secondary">
              Наименование
            </Label>
            <Input
              id="editor-title"
              className="title"
              type="text"
              name="title"
              value={editItem.title}
              onChange={handleChange}
              invalid={!titleValid}
            />
            <FormFeedback>Поле не может быть пустым</FormFeedback>
          </FormGroup>

          <FormGroup className="form-group">
            <Label for="subtitle" className="text-secondary">
              Примечания (Включения/Исключения)
            </Label>
            <Input
              type="textarea"
              name="subtitle"
              style={{ minHeight: 220 }}
              value={editItem.subtitle}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="form-group">
            <Label for="contents" className="text-secondary">
              Содержимое
            </Label>
            <Input
              type="textarea"
              name="contents"
              value={editItem.contents}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="form-group">
            <FormControlLabel
              control={
                <Switch
                  name="actual"
                  checked={editItem.actual}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Запись актуальна?"
            />
          </FormGroup>
        </Form>
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={onSubmit}>
          Сохранить
        </Button>{" "}
        <Button color="secondary" onClick={props.toggle}>
          Отмена
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditorModal;
