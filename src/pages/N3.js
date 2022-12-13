import React from "react";
import { useState } from "react";

export default function N3() {
  const [openForm, setOpenForm] = useState(false);
  const [oneColumn, setOneColumn] = useState(true);
  const [viewName, setViewName] = useState("");
  const [firstColumn, setFirstColumn] = useState([]);
  const [secondColumn, setSecondColumn] = useState([]);

  const changeState = () => {
    switch (openForm) {
      case false:
        setOpenForm(true);
        break;
      case true:
        setOpenForm(false);
        break;
      default:
        break;
    }
  };

  const changeColumn = (id) => {
    switch (id) {
      case "ColumnCheck1":
        setOneColumn(true);
        setSecondColumn([]);
        break;
      case "ColumnCheck2":
        setOneColumn(false);
        break;
      default:
        break;
    }
  };

  const cancel = () => {
    setOpenForm(false);
    setViewName();
    setOneColumn(true);
    setFirstColumn([]);
    setSecondColumn([]);
  };

  const addView = (e) => {
    switch (e.target.id) {
      case "menuOne":
        if (firstColumn.length < 1) {
          setFirstColumn([
            { position: 1, graph: e.target.previousElementSibling.value },
          ]);
          break;
        }
        let newArray = firstColumn.map((item) => item);
        newArray.push({
          position: firstColumn.length + 1,
          graph: e.target.previousElementSibling.value,
        });
        setFirstColumn(newArray);
        break;
      case "menuTwo":
        if (secondColumn.length < 1) {
          setSecondColumn([
            { position: 1, graph: e.target.previousElementSibling.value },
          ]);
          break;
        }
        let newSecondArray = secondColumn.map((item) => item);
        newSecondArray.push({
          position: secondColumn.length + 1,
          graph: e.target.previousElementSibling.value,
        });
        setSecondColumn(newSecondArray);
        break;
      default:
        break;
    }
  };

  const save = () => {
    // save first form info
    if (secondColumn.length < 1) {
      const savedView = {
        viewName: viewName,
        first: firstColumn,
      };
      console.log(savedView);
      // Implement axios put here or call axios function
    } else {
      const savedView = {
        viewName: viewName,
        first: firstColumn,
        second: secondColumn,
      };
      console.log(savedView);
      // Implement axios put here or call axios function
    }
    // window.location.reload();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-dark"
        onClick={changeState}
      >
        Create View
      </button>
      <div>
        {openForm ? (
          <form className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Name of view</label>
              <input
                type="text"
                className="form-control"
                id="NameOfView"
                value={viewName}
                onChange={(e) => setViewName(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="ColumnCheck1"
                  name="radio-stacked"
                  required
                  onClick={(e) => changeColumn(e.target.id)}
                />
                <label className="form-check-label">One column</label>
              </div>
              <div className="form-check mb-3">
                <input
                  type="radio"
                  className="form-check-input"
                  id="ColumnCheck2"
                  name="radio-stacked"
                  required
                  onClick={(e) => changeColumn(e.target.id)}
                />
                <label className="form-check-label">Two columns</label>
              </div>
            </div>
            <div>
              {oneColumn ? (
                <div>
                  <select className="form-select">
                    <option value="V1">V1</option>
                    <option value="V3">V3</option>
                    <option value="V4">V4</option>
                    <option value="V5">V5</option>
                    <option value="V6">V6</option>
                    <option value="V7">V7</option>
                    <option value="V8">V8</option>
                    <option value="V9">V9</option>
                  </select>
                  <button
                    onClick={(e) => addView(e)}
                    type="button"
                    id="menuOne"
                    className="btn btn-primary"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <div>
                  <div>
                    <select className="form-select">
                      <option value="V1">V1</option>
                      <option value="V3">V3</option>
                      <option value="V4">V4</option>
                      <option value="V5">V5</option>
                      <option value="V6">V6</option>
                      <option value="V7">V7</option>
                      <option value="V8">V8</option>
                      <option value="V9">V9</option>
                    </select>
                    <button
                      onClick={(e) => addView(e)}
                      type="button"
                      id="menuOne"
                      className="btn btn-primary"
                    >
                      Add
                    </button>
                    <select className="form-select">
                      <option value="V1">V1</option>
                      <option value="V3">V3</option>
                      <option value="V4">V4</option>
                      <option value="V5">V5</option>
                      <option value="V6">V6</option>
                      <option value="V7">V7</option>
                      <option value="V8">V8</option>
                      <option value="V9">V9</option>
                    </select>
                    <button
                      onClick={(e) => addView(e)}
                      type="button"
                      id="menuTwo"
                      className="btn btn-primary"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div>
              <ul className="list-group">
                {firstColumn.length > 0 ? (
                  firstColumn.map((item) => (
                    <li
                      className="list-group-item"
                      key={item.position + " first"}
                    >
                      {item.graph}
                    </li>
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </div>
            <div>
              <ul className="list-group">
                {secondColumn.length > 0 ? (
                  secondColumn.map((item) => (
                    <li
                      className="list-group-item"
                      key={item.position + " second"}
                    >
                      {item.graph}
                    </li>
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </div>
            <div className="col-12">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={cancel}
              >
                Cancel
              </button>
              <button className="btn btn-primary" type="button" onClick={save}>
                Save
              </button>
            </div>
          </form>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
