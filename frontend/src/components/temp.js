<>
  <div className="d-flex justify-content-start ms-4 me-3 mt-1">
    <span id={"item-title-" + props.item.mkb_code} className="mkb-title">
      <span
        className="mkb-code-badge px-1 rounded cursor-pointer"
        onClick={titleClickedHandler}
      >
        {props.item.mkb_code}
      </span>
      <a href="/#" onClick={titleClickedHandler} className="ms-1">
        {props.item.title}
      </a>
    </span>
  </div>
  <div className="d-flex justify-content-start ms-4 me-3 mt-1">
    <pre className="mkb-subtitle">
      {props.item.subtitle
        ? parseLinksInText(props.item.subtitle)
        : "Примечания отсутствуют."}
    </pre>
  </div>

  {props.isEditMode ? (
    <span
      className="badge badge-edit text-dark cursor-pointer mx-2 mt-2"
      onClick={handleEditItem}
    >
      Изменить
    </span>
  ) : null}
</>;
